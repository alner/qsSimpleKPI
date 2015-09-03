# Statistic block

Statistic (KPI) block component for Qlik Sense (under development).

## Installation

Download and unzip template to appropriate folder.

Hit

```sh

 npm install

 ```
 to install all required dependencies.

## Configuration

Modify *src/Template.qextmpl*.

Set appropriate document **url** parameter in the *server.config.json*.
Set appropriate local development server port (**devServerPort** parameter) in the *server.config.json*. Default value is 8080.

## Usage

```sh

npm run dev # for development

# or

npm run build # for production

```

Open **http://localhost:8080** for development.

## Maintainers

[alner](https://github.com/alner)

## License

MIT