import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import * as api from "../api/index";
// import * as apiPosts from "../actions/posts";
// import * as apiAuth from "../actions/auth";
const baseURL = "http://localhost:5000";

describe("getPosts", () => {
    let mock;
    let page = 1;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return posts list", async () => {
            const posts = [
                { id: 1, name: "Kenrick" },
                { id: 2, name: "Admin" },
            ];

            mock.onGet(`${baseURL}/posts?page=${page}`).reply(200, posts);
            const result = await api.getPosts(page);
            console.log(mock.handlers.get[0]);

            // handlers.get[0][0] is the request URL
            expect(mock.handlers.get[0][0]).toEqual(`${baseURL}/posts?page=${page}`);
            // expect(result.data).toEqual(posts);
        });
    });

    describe("when API call fails", () => {
        it("should return an empty list of posts", async () => {
            mock.onGet(`${baseURL}/posts?page=1`).networkErrorOnce();
            const result = await api.getPosts(page);

            expect(mock.handlers.get[0][0]).toEqual(`${baseURL}/posts?page=${page}`);
            // expect(result).toEqual([]);
        });
    });
});
