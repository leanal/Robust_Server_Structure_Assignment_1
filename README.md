# Robust Server Structure: URL shortener service assignment

This is a URL shortener service API using Node.js and Express. It allow users to submit a URL and receive a "shortened" code, or ID, that can be used to retrieve the original URL later. It also keeps track of how often each shortened URL is retrieved so you can calculate the most popular URL's.

## What is a URL Shortener?

e-commerce companies selling many different products under different categories may run into restrictions on the text length. 
For example: If a customer wants to share a link to the product on Twitter with www.shoppingsite.com/category/shoe/product/nike132032.
A URL shortener service overcomes this issue by shortening www.shoppingsite.com/category/shoe/product/nike/132032 to www.shoppingsite.com/8d13lk2k.
