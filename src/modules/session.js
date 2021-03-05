const os = require("os");

module.exports = {
	Session: class {
		constructor (token) {
			this.token = token;
			this.open = false;
			this.ready = false;
			this.seq = 0;
			this.id = 0;
			this.user = {};
			this.shouldResume = false;
			this.heartbeat_interval = 45000;
		}

		get identity() {
			return JSON.stringify({
				"op": 2,
				"d": {
					"token": this.token,
					"intents": 4608,
					"properties": {
						"$os": os.platform(),
						"$browser": "Discord",
						"$device": "Discord"
					}
				}
			})
		}

		get resume() {
			return JSON.stringify({
				"op": 6,
				"d": {
					"token": this.token,
					"session_id": this.id,
					"seq": this.seq
				}
			})
		}
	}
}
