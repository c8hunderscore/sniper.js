// files
const logger = require("./modules/logger");
const { Session } = require("./modules/session");
const config = require("../config.json");
// npm modules
const WebSocket = require("ws");
const fetch = require("node-fetch");
// node.js built-in modules
const fs = require("fs");
// tokens
const slaves = fs.readFileSync(config.tokens.paths.slaves, "utf8").split(/\r?\n/).filter(t => t != "" && !t.startsWith(" ") && !t.startsWith("\t"));
const owners = fs.readFileSync(config.tokens.paths.owners, "utf8").split(/\r?\n/).filter(t => t != "" && !t.startsWith(" ") && !t.startsWith("\t"));
// regex
const re = {
	"find": /(?:discord\.gift|discord\.com\/gifts|discordapp\.com\/gifts)\/[A-Za-z0-9]{16,25}/,
	"remove": /(?:discord\.gift|discord\.com\/gifts|discordapp\.com\/gifts)\//
}

let currentRedeemer = 0;
let redeemCount;

console.log(`Nitro Sniper `);

slaves.forEach((t, i) => {
	i += 1;
	let session = new Session(t);
	let ws = new WebSocket(config.urls.ws);
	let heartbeater = function () {
		return 0;
	}

	ws.on("open", () => {
		logger.event("ws_open", i);
		session.open = true;
	})

	ws.on("close", code => {
		logger.event("ws_close", code, i);
		session.open = false;
		session.ready = false;
		if (config.tokens.reconnect && code != 4004) {
			session.shouldResume = true;
			ws = new WebSocket(config.urls.ws);
		}
	})

	ws.on("message", msg => {
		msg = JSON.parse(msg);
		logger.event("ws_message", "incoming", msg, i);

		session.seq = msg.s;


		if (msg.op == 10 && !msg.t) {
			session.heartbeat_interval = msg.d.heartbeat_interval;
			if (!session.shouldResume) {
				let ID = session.identity;
				ws.send(ID);
				logger.event("ws_message", "outgoing", ID, i);
			} else {
				let Resume = session.resume;
				ws.send(Resume);
				logger.event("ws_message", "outgoing", Resume, i);
			}
		}

		if (!msg.op && msg.t == "READY") {
			session.user = msg.d.user;
			session.ready = true;
			session.id = msg.d.session_id;
			logger.event("ws_ready", session.user, i);
			heartbeater = setInterval(() => {
				if (!session.ready) return "Not ready";
				return ws.send(JSON.stringify({
					"op": 1,
					"d": session.seq
				}))
			}, session.heartbeat_interval)
		}

		if (msg.t == "MESSAGE_CREATE" || msg.t == "MESSAGE_UPDATE") {
			if (msg.d.content) {
				let nitros = msg.d.content.match(re.find);
				if (!nitros) return "No nitro in message";
				nitros.forEach(async n => {
					logger.event("nitro", "found", n, i);
					let req = await fetch(`${config.urls.api}/entitlements/gift-codes/${n}/redeem`, {
						"headers": {
							"authorization": owners[currentRedeemer]
						}
					})
					let res = req.json();
					if (nitro.subscription_plan) {
						logger.event("nitro", "valid", n, i);
						redeemCount++;
						switchRedeemer();
					} else {
						logger.event("nitro", "invalid", n, i);
					}
				})
			}
		}
	})
})

function switchRedeemer() {
	if (redeemCount != config.tokens.nitro_claims_before_switch) return currentRedeemer;
	redeemCount = 0;
	currentRedeemer++;
	if (currentRedeemer == owners.length)
		currentRedeemer = 0;
	return currentRedeemer;
}
