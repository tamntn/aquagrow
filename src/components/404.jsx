import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../style/404.css';

const NotFound = () => (
    <div className="dusk">
        <Helmet>
            {/* <title>Page Not Found</title> */}
            {/* Latest compiled and Bootstrap minified CSS */}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
            <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600' rel='stylesheet' type='text/css' />
            <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,300,700' rel='stylesheet' type='text/css' />
            <link href='http://fonts.googleapis.com/css?family=Ultra' rel='stylesheet' type='text/css' />
            <link href='http://fonts.googleapis.com/css?family=Rochester' rel='stylesheet' type='text/css' />
        </Helmet>
        <div className="col-md-12">
            <div className="owl-background">
                <div className="moon">
                    <div className="left-number">4</div>
                    <div className="right-number">4</div>
                </div>
                <div className="owl">
                    <div className="wing1"></div>
                    <div className="wing2"></div>
                    <div className="wing3"></div>
                    <div className="wing4"></div>
                    <div className="wing5"></div>
                    <div className="wing6"></div>
                    <div className="wing7"></div>
                    <div className="wing8"></div>
                    <div className="wing9"></div>
                    <div className="wing10"></div>
                    <div className="wing11"></div>
                    <div className="wing12"></div>
                    <div className="owl-head">
                        <div className="ears"></div>
                    </div>
                    <div className="owl-body">
                        <div className="owl-eyes">
                            <div className="owleye">
                                <div className="owleye inner"></div>
                                <div className="owleye inner inner-2"></div>
                                <div className="eyelid top"></div>
                                <div className="eyelid bottom"></div>
                            </div>
                            <div className="owleye">
                                <div className="owleye inner"></div>
                                <div className="owleye inner inner-2"></div>
                                <div className="eyelid top"></div>
                                <div className="eyelid bottom"></div>
                            </div>
                            <div className="nose"></div>
                        </div>
                        <div className="feet">
                            <div className="foot1"></div>
                            <div className="foot2"></div>
                        </div>
                    </div>
                    <div className="branch"></div>
                </div>
            </div>
        </div>
        <div className="col-md-12">
            <div className="message">
                <h2>You're lost in the dark!</h2>
                <p>The page you're looking for does not exist</p>
                <p>Back to <Link to="/">Homepage</Link></p>
            </div>
        </div>
        <div id='stars1'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div id='sstar'></div>
    </div>
)

export default NotFound;