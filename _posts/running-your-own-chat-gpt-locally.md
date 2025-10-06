---
title: "How to Run Your Own ChatGPT Locally"
date: "2025-06-09"
slug: "running-your-own-chat-gpt-locally"
canonicalUrl: "https://butterwith.space"
tags:
  - LLMs
  - Technical
---



## Getting llama.cpp Running

The fastest way to get your own LLM running locally is with llama.cpp - a C++ implementation optimized for running large language models on consumer hardware. It's particularly good at making models work efficiently on systems with limited VRAM or even CPU-only setups.

### Installing llama.cpp

There are a few ways to get llama.cpp on your system. If you're on macOS with Homebrew, it's as simple as:

```bash
brew install llama.cpp
```

For other systems, you'll want to build from source to get the best performance for your specific hardware:

```bash
winget install llama.cpp
```

```bash
nix profile install nixpkgs#llama-cpp
```

### Choosing Your Model

This is where things get interesting. You need to balance model capability with your hardware constraints. Models come in different sizes - 7B, 13B, 70B parameters - and different quantization levels that affect both quality and resource usage.

For most people starting out, I'd recommend:

- **7B models** if you have 8GB+ RAM and want fast responses
- **13B models** if you have 16GB+ RAM and want better quality
- **Q4_K_M quantization** as a good balance of quality and size

You can find pre-quantized models on Hugging Face. Popular choices include:

- `microsoft/Phi-3-mini-4k-instruct-gguf` (great for coding tasks)
- `meta-llama/Meta-Llama-3.1-8B-Instruct-GGUF` (good general purpose)
- `mistralai/Mistral-7B-Instruct-v0.3-GGUF` (solid all-rounder)

### Starting the Server

Once you have both llama.cpp and a model, you can start the server:

```bash
./llama-server \
  --model ./Phi-3-mini-4k-instruct-q4.gguf \
  --ctx-size 4096 \
  --threads 8 \
  --port 8080
```

Let's break down these parameters:
- `--ctx-size` controls how much conversation history the model remembers
- `--threads` should roughly match your CPU cores for CPU inference
- `--port` sets where the API will be accessible

If you have a GPU, add `--gpu-layers 35` (adjust the number based on your VRAM - start high and reduce if you get memory errors).

### Testing Your Setup

Your server should now be running on `http://localhost:8080`. You can test it with a simple curl command:

```bash
curl -X POST http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello, are you working?"}],
    "max_tokens": 50
  }'
```

If everything is working, you'll get a JSON response with the model's reply.

### Performance Tuning

Getting good performance takes a bit of experimentation. Here are the key things to adjust:

**For CPU inference:**
- Set `--threads` to match your physical cores (not logical cores)
- Increase `--batch-size` if you have plenty of RAM
- Use `--mlock` to keep the model in memory

**For GPU inference:**
- Start with `--gpu-layers -1` to offload everything to GPU
- If you run out of VRAM, reduce the number gradually
- Monitor your GPU memory usage with `nvidia-smi`

**Memory management:**
- Larger `--ctx-size` uses more memory but remembers more conversation
- If you're getting out-of-memory errors, try a smaller model or lower quantization

The built-in web interface at `http://localhost:8080` is functional but basic. It's perfect for testing your setup, but you'll probably want something more polished for daily use - which is exactly what we'll build next.