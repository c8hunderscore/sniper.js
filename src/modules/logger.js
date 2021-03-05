const { logging } = require("../../config.json");
const fs = require("fs");

function file(toLog) {
	fs.appendFileSync(logging.file.path, `${toLog}\n`, "utf8");
}

module.exports = {
	event: function (event, params) {
		let toLog = {
			"console": "",
			"file": ""
		}
		switch (event) {
			case "ws_open":
				if (!logging.events.ws_open)
					return "Not logged.";
				
				if (logging.console.enabled) {
					logging.console.style
					? toLog.console = `\x1b[1m\x1b[34mWebSocket\x1b[0m open for token \x1b[1m${arguments[1]}\x1b[0m`
					: toLog.console = `WebSocket open for token ${arguments[1]}`;

					if (logging.console.timestamp)
						toLog.console = `${Date.now().toString()} | ${toLog.console}`;
					
					console.log(toLog.console);
				}

				if (logging.file.enabled) {
					toLog.file = `WebSocket open for token ${arguments[1]}`;

					if (logging.file.timestamp)
						toLog.file = `${Date.now().toString()} | ${toLog.file}`;

					file(toLog.file);
				}

				return "Logged.";
			
			case "ws_close":
				if (!logging.events.ws_close)
					return "Not logged.";
				
				if (arguments[1] == 4004) {
					if (logging.console.enabled) {
						logging.console.style
						? toLog.console = `\x1b[31mToken \x1b[1m${arguments[2]}\x1b[22m is invalid\x1b[0m`
						: toLog.console = `Token ${arguments[2]} is invalid`;

						if (logging.console.timestamp)
							toLog.console = `${Date.now().toString()} | ${toLog.console}`;
						
						console.log(toLog.console);
					}

					if (logging.file.enabled) {
						toLog.file = `Token ${arguments[2]} is invalid`;

						if (logging.file.timestamp)
							toLog.file = `${Date.now().toString()} | ${toLog.file}`;
						
						file(toLog.file);
					}
				} else {
					if (logging.console.enabled) {
						logging.console.style
						? toLog.console = `\x1b[1m\x1b[34mWebSocket\x1b[0m closed for token \x1b[1m${arguments[2]}\x1b[0m with code \x1b[1m${arguments[1]}\x1b[0m`
						: toLog.console = `WebSocket closed for token ${arguments[2]} with code ${arguments[1]}`;

						if (logging.console.timestamp)
							toLog.console = `${Date.now().toString()} | ${toLog.console}`;
						
						console.log(toLog.console);
					}

					if (logging.file.enabled) {
						toLog.file = `WebSocket closed for token ${arguments[2]} with code ${arguments[1]}`;

						if (logging.file.timestamp)
							toLog.file = `${Date.now().toString()} | ${toLog.file}`;
						
						file(toLog.file);
					}
				}

				return "Logged.";
			
			case "ws_ready":
				if (!logging.events.ws_ready)
					return "Not logged.";
				
				if (logging.console.enabled) {
					logging.console.style
					? toLog.console = `\x1b[1m\x1b[34mWebSocket\x1b[0m ready for token \x1b[1m${arguments[2]}\x1b[0m as \x1b[1m${arguments[1].username}#${arguments[1].discriminator}\x1b[0m`
					: toLog.console = `WebSocket ready for token ${arguments[2]} as ${arguments[1].username}#${arguments[1].discriminator}`;

					if (logging.console.timestamp)
						toLog.console = `${Date.now().toString()} | ${toLog.console}`;
					
					console.log(toLog.console);
				}

				if (logging.file.enabled) {
					toLog.file = `WebSocket ready for token ${arguments[2]} as ${arguments[1].username}#${arguments[1].discriminator}`;

					if (logging.file.timestamp)
						toLog.file = `${Date.now().toString()} | ${toLog.file}`;

					file(toLog.file);
				}

				return "Logged.";
				
			case "ws_message":
				if (arguments[1] == "incoming") {
					if (!logging.events.ws_message.incoming)
						return "Not logged.";
					
					if (logging.console.enabled) {
						logging.console.style
						? toLog.console = `\x1b[1m\x1b[34mWebSocket\x1b[0m message recieved | op: \x1b[1m${arguments[2].op}\x1b[0m, t: \x1b[1m${arguments[2].t}\x1b[0m token: \x1b[1m${arguments[3]}\x1b[0m`
						: toLog.console = `WebSocket message recieved | op: ${arguments[2].op}, t: ${arguments[2].t} token: ${arguments[3]}`;

						if (logging.console.timestamp)
							toLog.console = `${Date.now().toString()} | ${toLog.console}`;

						
						console.log(toLog.console);
					}

					if (logging.file.enabled) {
						toLog.file = `WebSocket message recieved | ${JSON.stringify(arguments[2])} | token: ${arguments[3]}`;

						if (logging.file.timestamp)
							toLog.file = `${Date.now().toString()} | ${toLog.file}`;
						
						file(toLog.file);
					}

					return "Logged.";
				} else if (arguments[2] == "outgoing") {
					if (!logging.events.ws_message.outgoing)
						return "Not logged.";
					
					if (logging.console.enabled) {
						logging.console.style
						? toLog.console = `\x1b[1m\x1b[34mWebSocket\x1b[0m message sent | token: ${arguments[3]}`
						: toLog.console = `WebSocket message sent | token: ${arguments[3]}`;

						if (logging.console.timestamp)
							toLog.console = `${Date.now().toString()} | ${toLog.console}`;
						
						console.log(toLog.console);
					}

					if (logging.file.enabled) {
						toLog.file = `WebSocket message sent | ${JSON.stringify(arguments[2])} | token: ${arguments[3]}`;

						if (logging.file.timestamp)
							toLog.file = `${Date.now().toString()} | ${toLog.file}`;
						
						file(toLog.file);
					}

					return "Logged.";
				} else {
					return "Not logged.";
				}
			
			case "nitro":
				switch (arguments[1]) {
					case "found":
						if (!logging.events.nitro.found)
							return "Not logged.";
						
						if (logging.console.enabled) {
							logging.console.style
							? toLog.console = `\x1b[1m\x1b[35mNitro\x1b[0m found by token ${arguments[3]} | code: \x1b[1m${arguments[2]}\x1b[0m`
							: toLog.console = `Nitro found by token ${arguments[3]} | code: ${arguments[2]}`;

							if (logging.console.timestamp)
								toLog.console = `${Date.now().toString()} | ${toLog.console}`;
							
							console.log(toLog.console);
						}

						if (logging.file.enabled) {
							toLog.file = `Nitro found by token ${arguments[3]} | code: ${arguments[2]}`;

							if (logging.file.timestamp)
								toLog.file = `${Date.now().toString()} | ${toLog.file}`;
							
							file(toLog.file);
						}

						return "Logged.";

					case "claimed_invalid":
						if (!logging.events.nitro.invalid)
							return "Not logged.";
						
						if (logging.console.enabled) {
							logging.console.style
							? toLog.console = `\x1b[1m\x1b[31mNitro\x1b[22m found by token ${arguments[3]} | code: \x1b[1m${arguments[2]}\x1b[22m was \x1b[1minvalid\x1b[0m`
							: toLog.console = `Nitro found by token ${arguments[3]} | code: ${arguments[2]} was invalid`;

							if (logging.console.timestamp)
								toLog.console = `${Date.now().toString()} | ${toLog.console}`;
							
							console.log(toLog.console);
						}

						if (logging.file.enabled) {
							toLog.file = `Nitro found by token ${arguments[3]} | code: ${arguments[2]} was invalid`;

							if (logging.file.timestamp)
								toLog.file = `${Date.now().toString()} | ${toLog.file}`;
							
							file(toLog.file);
						}

						return "Logged.";

					case "claimed_valid":
						if (!logging.events.nitro.valid)
							return "Not logged.";
						
						if (logging.console.enabled) {
							logging.console.style
							? toLog.console = `\x1b[1m\x1b[32mNitro\x1b[22m found by token ${arguments[3]} | code: \x1b[1m${arguments[2]}\x1b[22m was \x1b[1mvalid\x1b[0m`
							: toLog.console = `Nitro found by token ${arguments[3]} | code: ${arguments[2]} was valid`;

							if (logging.console.timestamp)
								toLog.console = `${Date.now().toString()} | ${toLog.console}`;
							
							if (logging.bell)
								toLog.console += "\x07";
							
							console.log(toLog.console);
						}

						if (logging.file.enabled) {
							toLog.file = `Nitro found by token ${arguments[3]} | code: ${arguments[2]} was valid`;

							if (logging.file.timestamp)
								toLog.file = `${Date.now().toString()} | ${toLog.file}`;
							
							file(toLog.file);
						}
				}
		}
	}
}
