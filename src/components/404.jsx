import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../style/404.css';

const NotFound = () => (
    <div class="dusk">
        <Helmet>
            {/* <title>Page Not Found</title> */}
            {/* Latest compiled and Bootstrap minified CSS */}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
            <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600' rel='stylesheet' type='text/css' />
            <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,300,700' rel='stylesheet' type='text/css' />
            <link href='http://fonts.googleapis.com/css?family=Ultra' rel='stylesheet' type='text/css' />
            <link href='http://fonts.googleapis.com/css?family=Rochester' rel='stylesheet' type='text/css' />
        </Helmet>
        <div class="col-md-12">
            <div class="owl-background">
                <div class="moon">
                    <div class="left-number">4</div>
                    <div class="right-number">4</div>
                </div>
                <div class="owl">
                    <div class="wing1"></div>
                    <div class="wing2"></div>
                    <div class="wing3"></div>
                    <div class="wing4"></div>
                    <div class="wing5"></div>
                    <div class="wing6"></div>
                    <div class="wing7"></div>
                    <div class="wing8"></div>
                    <div class="wing9"></div>
                    <div class="wing10"></div>
                    <div class="wing11"></div>
                    <div class="wing12"></div>
                    <div class="owl-head">
                        <div class="ears"></div>
                    </div>
                    <div class="owl-body">
                        <div class="owl-eyes">
                            <div class="owleye">
                                <div class="owleye inner"></div>
                                <div class="owleye inner inner-2"></div>
                                <div class="eyelid top"></div>
                                <div class="eyelid bottom"></div>
                            </div>
                            <div class="owleye">
                                <div class="owleye inner"></div>
                                <div class="owleye inner inner-2"></div>
                                <div class="eyelid top"></div>
                                <div class="eyelid bottom"></div>
                            </div>
                            <div class="nose"></div>
                        </div>
                        <div class="feet">
                            <div class="foot1"></div>
                            <div class="foot2"></div>
                        </div>
                    </div>
                    <div class="branch"></div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="message">
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