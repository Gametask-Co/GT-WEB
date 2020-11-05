import React from "react";
import PropTypes from "prop-types";

import GlobalStyles from "../../styles/global";
import Header from "../../components/Header";
import Container from "../../components/Container";

const Layout = ({ children, pageTitle }) => {
  return (
    <>
      <GlobalStyles />
      <Header siteTitle={pageTitle} />
      <Container>{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;