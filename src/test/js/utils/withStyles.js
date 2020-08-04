import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider';

const generateClassName = (rule, styleSheet) =>
    `${styleSheet.options.classNamePrefix}-${rule.key}`;

const withStyles = fn => (
    <JssProvider generateClassName={generateClassName}>
        {fn}
    </JssProvider>
);

export default withStyles;