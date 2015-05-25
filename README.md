# Api-Mocker

Api-Mocker is your mock services. It dynamically routes your contract endpoint definitions to mock service resoponses.

## Installation

download it

## Usage
Create sample contract in your folder
`{
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
}`

### Linux

`node app.js -p "/yourMockPath"`

### Windows

`node app.js -p "c:\yourMockPath"`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

