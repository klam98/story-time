import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Navigate to="/posts" />} />
                    <Route exact path="/posts" element={<Home />} />
                    <Route exact path="/posts/search" element={<Home />} />
                    <Route exact path="/posts/:id" element={<PostDetails />} />
                    {/* redirect user back to home if they are already logged in */}
                    <Route
                        exact
                        path="/auth"
                        element={!user ? <Auth /> : <Navigate to="/posts" />}
                    />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
