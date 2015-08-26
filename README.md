# Api-Mocker

Api-Mocker is your dummy data generator. It creates dummy service responses according to your contracts you define for Api-Valter so that while you developing a program in your work station, you do not need any web service to get the data you need. Api-Mocker creates the mock data you need from your contracts. 


## Installation
* Install nodejs from https://nodejs.org/
* Clone Api-Mocker into your workspace

## Usage
Create sample.contract file in your contract directory
```javascript
{
    "on": "GET",
    "uri": "/endpoint",
    "expect": {
        "request": {
            "status_code": 200,
            "headers": []
        },
        "body": {
            "mydata": {
					"key" : "val"
            }
        }
    }
}
```

### Execute
Execute in your terminal:
* `cd cloned-api-mocker-directory`
* `node app.js -p "/contract-directory"`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
