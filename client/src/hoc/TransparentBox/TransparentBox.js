import React, { Fragment } from "react";

const TransparentBox = props => {
  return (
    <Fragment>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
        <main className="pa4 black-80">{props.children}</main>
      </article>
    </Fragment>
  );
};

export default TransparentBox;
