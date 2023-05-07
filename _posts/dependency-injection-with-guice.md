---
title: "Dependency Injection in Java with Guice"
date: "2020-07-19"
slug: "dependency-injection-with-guice"
tags:
  - Java
  - Guice
  - Dependency Injection
---

This post is designed as an overview and reference guide to the different methods of using dependency injection in Java. For in-depth documentation and the background context around the Guice library see the [official Guice documentation](https://github.com/google/guice/wiki).

#### What is DI?

Dependency Injection (DI) is a design pattern. It's core principle is to separate behaviour from dependency resolution. This means your classes should only have to deal with their function, and not have to consider where their dependencies are coming from.

#### Why use DI?

DI is useful for two main reasons. Firstly, it enables you to write loosely coupled classes. As dependencies are resolved by a central mechanism, there are no ties to a factory or provider class that will instantiate your dependencies. Dependency management is now configured in a single place, in this case using Guice and Modules.

Secondly, injected dependencies are easy to mock making your loosely coupled classes easier to test. As you'll see later on, mocking what were once complex dependencies is as simple as using the `@Mock` annotation and passing them to the constructor.

#### All examples are for Guice

As the heading says, all of the examples in this post use Guice for dependency resolution. Guice is an industry standard Java library for implementing DI and widely used and well documented online. Let's get right into.

#### Application Setup

In the simplest instance, Guice is configured using a single `AbstractModule` and a statically generated injector. With these 8 lines, you can create an injector and fetch instances of any configured class within your application.

```java
public MyModule extends AbstractModule {
 @override
 protected void configure() {
  // Write your bindings for interfaces here e.g.
  bind(IMyInterface.class).to(MyInterfaceImpl.class);
 }
}
```

```java
public static void main(String[] args) {
 Injector injector = Guice.createInjector(new MyModule());
 // Injected instance of MyClass.
 MyClass myClass = injector.getInstance(MyClass.class);
}
```

#### Injecting Dependencies via Constructor Arguments (Recommended Approach)

This is the simplest example of dependency injection. `MyInjectedClass` has a no-arguments constructor so it can be injected into `MyClass` without any set up. Guice will fetch a new instance of  `MyInjectedClass` - no need for a factory class or `new MyInjectectedClass();` . `@Inject` lets Guice know that the constructor parameters should be resolved using DI.

```java
public MyInjectedClass () {
 ...
} 

@Inject
public MyClass(MyInjectedClass injectedClass) {
 ...
} 
```

If your injected class has dependencies, annotate that class with the `@Inject` annotation. Guice will recursively fetch the required instances until it reaches a no-arguments constructor or all dependencies have been satisfied.

#### Injecting Field Dependencies

Instead of using constructor arguments, dependencies can be injected directly to a field. This is the most concise form of injection but is difficult to test (testing constructor injection is covered below.)

```java
public class DemoClass {
 @Inject
 MyClass instanceOfMyClass;

 public DemoClass() {
  // NOTE THAT instanceOfMyClass will be null here
 }

 public bool hasMyClass() {
  return instanceOfMyClass != null;
 }
}
```

One thing to note about field injection is that **the  field will not be instantiated inside the constructor**. If you need the field to be instantiated in the constructor you must use constructor injection.

#### DI for Static Dependencies

You might find yourself migrating parts of an older project from static factories to dependency injection and you need to grab an instance of a class set up for DI in a static class. No problem. You can configure Guice to set up your static classes at injector-creation time.

```java
// Override the configure() method of your module
@Override 
public void configure() {
  requestStaticInjection(MyStaticClass.class);
}
...

class MyStaticClass {
 @Inject
 private static MyClass instanceOfMyClass;
}
```

#### Using the Provides Annotation

If your class requires some set up, you might want to create a `@Provides` annotated method inside your module. This allows you to run some code or provide some configuration when instantiating a class.

```java
@Provides
public MyClass providesMyClass() {
 MyClass instance = new MyClass();
 instance.setSomeValue("cool");
  return instance;
}
```

##### Named Annotation

The `@Named` annotation allows you to identify a specific instance of a class. This is required by Guice if you have more than one instance of a class - very handy if you connect to multiple databases or caches using the same wrapper class, just set up a `@Named` provider for each one.

```java
@Provides
@Named("SpecialInstanceOfMyClass")
public MyClass providesMyClass() {
  return new MyClass();
}

@Inject
public SomeOtherClass(@Named("SpecialInstanceOfMyClass") MyClass instanceOfMyClass) {
  ...
}
```

##### Binding Interfaces to Implementations

Guice needs to be told how to implement interfaces. As with the set up example at the beginning of this post, interfaces can be bound to their implementations inside a module.

```java
public MyModule extends AbstractModule {
 @override
 protected void configure() {
  // Write your bindings for interfaces here e.g.
  bind(IMyInterface.class).to(MyInterfaceImpl.class);
  bind(IOtherInterface.class).to(OtherImplementation.class);
 }
}
```

##### Configuring Multiple modules

If you find your module is becoming large, or you want to separate concerns into different files for readability, you can register multiple modules with Guice. Be careful not to register the same dependency in more than one module - Guice will remind you with a helpful compiler exception.

```java
Injector injector = Guice.createInjector(
 new MyModule(),
 new OtherModule()
);
```

#### Automatically bound things

Some frameworks are configured for Guice out of the box and will automatically bind providers for interfaces. For example Dropwizard will automatically bind instances of the `Managed` interface - any implementations you attempt to register in your module will throw an exception.

#### Testing

The great thing about dependency injection is it makes your dependencies easy to mock and your tests simple to write. Imagine the following class with two dependencies injected into the constructor:

```java
class MyExampleClass {
 DBClient client;
 CacheClient cache;

 @Inject
 public MyExampleClass(DBClient client, CacheClient cache) {
  this.client = client;
  this.cache = cache;
 }
}
```

Using the `@Mock` annotation, we can get Mockito to create a mock version of each of the dependencies with no extra set up. These can be passed into our constructor to be used later. An example test file might look like this:

```java
@RunWith(MockitoJUnitRunner.class)
public class MyExampleClassTest {
 @Mock
 DBClient mockClient;
 @Mock
 CacheClient mockCache;

 MyExampleClass myClass;

 @BeforeEach
 public void setup() {
   myClass = new MyClass(mockClient, mockCache);
 }

 @Test
 public void myTest() {
  // Use the static Mockito.when() method to set up your mocks
  when(mockClient.connect()).thenReturn(new Connection());
  myClass.someFunction();
 }
}
```

##### Creating an injector and binding classes

Finally, if you're using Field Injection and you need to mock that dependency you can set up your tests as follows:

```java
@RunWith(MockitoJUnitRunner.class)
public class MyExampleClassTest {
 @Mock
 MyFieldDependency mockDependency;

 @BeforeEach
 public void setup() {
  var injector = Guice.createInjector(new AbstractModule() {
   @Override
   protected void configure() {
    bind(MyFieldDependency.class).toInstance(mockDependency);
     }
  });
  myClass = injector.getInstance(MyClass.class);
 }

 @Test
 public void myTest() {
  // Use the static Mockito.when() method to set up your mocks
  when(mockDependency.something()).thenReturn(true);
  myClass.someFunction();
 }
}
```

This tells Guice to fetch an instance of `MyClass` and to use `mockDependency` to resolve the injected field `MyFieldDependency`.
