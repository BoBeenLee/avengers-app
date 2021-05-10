/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components/native";
import { Regular12 } from "@shared/components/text/Typographies";

const TouchabledView = styled.TouchableOpacity`
  padding: 40px;
`;

class BuggyCounter extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }: any) => ({
      counter: counter + 1
    }));
  }

  public render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error("I crashed!");
    }
    return (
      <TouchabledView onPress={this.handleClick}>
        <Regular12>{this.state.counter}</Regular12>
      </TouchabledView>
    );
  }
}

export default BuggyCounter;
