exports.handler = async function(event, context) {
  const data = {word: "UNRUFFLED"};
  
  return {
		statusCode:200,
		body:JSON.stringify(data),
    headers: {'Content-type': 'application/JSON'}
	};
}