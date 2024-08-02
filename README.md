# Ote-API

Ote-API is a compiler API that is used to compile code. It provides an API for compiling code programmatically, without the need for manual intervention.


## Installation

Clone the repository and run `npm install` to install the dependencies.


## Usage

Start the server by running `npm run dev`.



The server runs on `localhost:3000`.

## API Endpoints

- `GET /`: Returns 'Hello World!'
- `POST /compile`: Compiles the code sent in the request body.
Where:
    ```js
    
        const body = {
            lang: <string>, // the programming language of the code
            input: <string>, // the input for the code
            code: <string>, // the code to be compiled
        }

    ```

- `GET /list`: Returns a list of supported languages: 'cpp', 'py', 'c', 'go', 'cs'.
- `* /{any*}`: Returns a 404 error for any undefined routes.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
