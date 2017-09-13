import React from "react";
import classNames from "classnames";

import { node } from "prop-types";

// empty components, so the user can use <Title>
export const Title = () => {};
export const Content = () => {};

/**
 * Usage:
 * import { Accordion, Title, Content } from "./Accordion/Accordion.jsx";
 *
 * <Accordion>
 *   <Title> the <span>title</span> </Title>
 *   <Content>
 *    <div> some content </div>
 *    <div> more content </div>
 *   </Content>
 * </Accordion>
 */

export const Accordion = React.createClass({

  propTypes: {
    title: node,
    children: node
  },

  getInitialState() {
    return {
      isOpen: true,
      height: 0
    };
  },

  componentDidMount() {
    this.componentDidUpdate(this.props, this.state);
  },

  componentDidUpdate() {
    this.adjustHeight();
  },

  /* update the height if it's open */
  adjustHeight(){
    const newHeight = this.content.clientHeight;

    if (this.state.isOpen && newHeight !== this.state.height){
      this.setState({
        height: newHeight
      });
    }
  },

  handleTitleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },


  render() {

    const { isOpen, height } = this.state;
    const { children } = this.props;

    const entryClasses = classNames("accordion__entry", {
      "is-open": isOpen
    });


    // extract <Title> and <Content>, ignore any other children
    const { title, content } = React.Children.toArray(children)
      .reduce((obj, child) => {

        // react components are functions
        if (typeof(child.type) !== "function") {
          return obj;
        }
        else if (child.type && child.type.name && child.type.name === "Title"){
          obj.title = child.props.children;
        }
        else if (child.type && child.type.name && child.type.name === "Content"){
          obj.content = child.props.children;
        }
        return obj;

      }, {});


    return (
      <div className={entryClasses}>
        <div className="accordion__entry-title" onClick={this.handleTitleClick}>
          {title}
        </div>

        <div className="accordion__entry-content-holder" style={{ height: isOpen ? height: 0 }}>
          <div className="accordion__entry-content" ref={x => this.content = x}>
            {content}
          </div>
        </div>
      </div>
    );
  }
});
