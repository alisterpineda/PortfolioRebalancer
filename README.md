# PortfolioRebalancer
![Build](https://github.com/alisterpineda/PortfolioRebalancer/workflows/Build/badge.svg)

A simple Svelte web application tool that calculates the amount of stocks to buy and sell in order to achieve the desired asset allocation in an investment portfolio. 

## Demo
Try it yourself @ https://demo-portfoliorebalancer.alisterpineda.com

![Demo Video](docs/demo.gif)

### How To Run Locally

1. Clone the repo
2. Assuming Node.js is installed, run `npm install` in the shell of your choice in the repo directory.
3. Run `npm run dev`

## How It Works

The cash balance and stock positions provided to the app are considered collectively as the *Account*.

The *Account* has a hidden variable called the *Score* which is the square root of the sum of *Subscores* which are derived from the cash balance and each of the individual stock positions.

A *Subscore* of an asset like the cash balance or a stock position is calculated by the following equation:

![equation](docs/eqn0.svg)

where 

![equation](docs/eqn1.svg)

![equation](docs/eqn2.svg)

![equation](docs/eqn3.svg)

![equation](docs/eqn4.svg)

With the given equations so far, it should be clear that the *Score* is the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) between the two points, the current *Account* and the target *Account*, where the number of dimensions depend on the number of stock positions.

The app essentially tries to minimize the distance/*Score* as much as possible by tweaking the quantity held by each stock position with the available cash balance in mind. The difference between the original quantity and the final quantity after the calculation determines the amount the user should buy or sell on a particular stock.