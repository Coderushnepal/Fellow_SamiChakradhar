import React, { Component } from "react";

import Beer from "./Beer";
import * as toast from "../../../utils/toast";
import { Header, Spinner } from "../../commons";
import { fetchBeers } from "../../../services/beerService";

class BeerGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      beers: [],
    };
  }

  scrollParentRef = null;

  fetchBeers = async () => {
    try {
      const data = await fetchBeers();

      this.setState({
        beers: data,
        isLoading: false,
      });
      console.log("ya")
      // toast.success({ title: "Yay!!",message: "Beers successfully retrieved!"});
    } catch (error) {
      const errorMsg = error.response.data.message;
console.log("Oh Snap!!");
      // toast.error({ title: "Oh Snap!!", message: errorMsg });
    }
  };

  componentDidMount() {
    this.fetchBeers();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <Header />

        {isLoading ? (
          <Spinner />
        ) : (
          <main>
            <div className="container" ref={(r) => (this.scrollParentRef = r)}>
              {this.state.beers.map((beer) => (
                <Beer key={beer.id} info={beer} />
              ))}
            </div>
          </main>
        )}
      </div>
    );
  }
}

export default BeerGrid;
