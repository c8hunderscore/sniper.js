# Nitro Sniper
A Discord Nitro Sniper

___

## How to set up
### Requirements:
- [Node.JS](https://www.nodejs.org/en/download)
- [Git](https://git-scm.com/downloads) (Optional)
- [NPM](https://www.npmjs.org/) (Usually installed _with_ Node.JS)
- Any text editor

### Instructions:
1. Clone or download this git repo
2. Open your terminal/command prompt
3. Navigate to the directory you cloned the repo to
4. Open config.json in your text editor
5. Chose your options (if you are not sure what something means, check _stuff/config.jsonc for a commented version)
6. Make sure you have your tokens ready and in the correct path
7. Run `npm start`, `node .`, or `node src/index.js` and the sniper will start
8. Profit

___

## Useful Info
### How to disable tokens from your token list:
Theoretical Token list
```
this.is.a_token
not.a_real.token
THIS.TOKEN.IS_INVALID
another.fake.token
```

As you may have figured out, the token on line 3 is invalid, but let's pretend we don't know that.

if in config.json, you have set logging invalid tokens to `true`
```json
{
  "logging": {
    "events": {
      "ws_close": {
        "invalid_token": true
      }
    }
  }
}
```
in the console you should get:
```
token 3 is invalid
```

this means that the third enabled token was invalid
so we can disable this token in our tokenlist

### Here's how
Example 1 (Using 1 Space):
```
this.is.a_token
not.a_real.token
 THIS.TOKEN.IS_INVALID
another.fake.token
```
Example 2 (Using Soft Tab - 2 Spaces):
```
this.is.a_token
not.a_real.token
  THIS.TOKEN.IS_INVALID
another.fake.token
```
Example 3 (Using Soft Tab - 4 Spaces):
```
this.is.a_token
not.a_real.token
    THIS.TOKEN.IS_INVALID
another.fake.token
```
Example 4 (Using Hard Tab):
```
this.is.a_token
not.a_real.token
	THIS.TOKEN.IS_INVALID
another.fake.token
```

in all these examples, the invalid token will be ignored
you can also use this to comment your token list, but why would you do that?

### How to host this on [Heroku](https://heroku.com/)
1. Create a file called "Procfile" (without quotes)
2. Set the contents of the Procfile to:
```Procfile
worker: npm start
```
3. Make sure your config.json file has these settings:
```json
{
  "logging": {
    "console": {
      "style": false
    },
    "bell": false
  }
}
```
4. Upload it to Heroku (go to [https://dashboard.heroku.com/apps/{app_name}/deploy]())

___

Feel like something is missing? [Tell me]()
