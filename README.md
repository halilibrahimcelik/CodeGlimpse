**Wellcome to codepadjs**

Codepadjs is CLI tool for running javascript code in your local machine. Basically it provides an integrated development environment (IDE) and a text-editor It is written in nodejs and uses the [vm](https://nodejs.org/api/vm.html) module to run the code.
**Wellcome to codepadjs**

In order to run codepadjs you need to have nodejs installed on your machine. You can download it from [here](https://nodejs.org/en/download/).

## Installation

To install codepadjs run the following command in your terminal:

`npx codepadjs serve`

## Usage

- After installing codepadjs, local CLI will open and runnig on port by default `localhost:4005`. You can access it by opening your browser and typing `localhost:4005` in the address bar and hitting enter.

- If portal had already been used on your machine, you can run it again by typing `npx codepadjs serve -p {number}` in your terminal. Replace `{number}` with the port number you want to use.

- Saved code snippets will be stored in the `codepad.js` file which is located in a file directory where you run `npx codepadjs serve` command.

---

##### Usage of Code Editor

- By default React is integrated into Code Editor. So you don't have worry about importing React.

-You can facilitate the use of the Code Editor by using the following shortcuts:

-`show()` function

![image](https://raw.githubusercontent.com/halilibrahimcelik/CodeGlimpse/main/packages/cli/assets/show.png?token=GHSAT0AAAAAACHCFGOJPKFYQUNQO2P243RYZI5LR2A)

-Tailwind also integrated into Code Editor. So you dont have to worry about intagrating UI library. You can use Tailwind by typing
`className=""` in your JSX code.

- Happy coding!

## License

ISC

## Author

[Halil İbrahim Çelik](https://www.linkedin.com/in/halil-ibrahim-celik/)
