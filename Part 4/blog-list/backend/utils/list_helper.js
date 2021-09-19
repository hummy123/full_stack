const dummy = (blogs) => {
	console.log(blogs) //to get rid of eslint warning
	return 1
}

const totalLikes = (blogs) => {
	const sumLikes = (sum, item) =>
		sum + item.likes

	return blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
	const reducer = (top, current) =>
		(current.likes > top.likes) ? current : top

	return blogs.reduce(reducer, {likes: 0})
}

const mostBlogs = (blogs) => {
	//key-value pair to track number of blogs by author
	let counter = new Map()

	//simple function to increment an author's blog count
	const updateCounter = (author) => {
		counter.set(author,
			(counter.get(author) === undefined)
				? 1 : counter.get(author) + 1)
	}

	//run through each blog and set/increment for each author
	for (const blog of blogs) updateCounter(blog.author)

	//return author with most blogs in map
	const reducer = (top, current) =>
		(current[1] > top[1]) ? current : top
	const topAuthor = [...counter.entries()].reduce(reducer)

	return {author: topAuthor[0], blogs: topAuthor[1]}
}

const mostLikes = (blogs) => {
	//key-value pair to track number of likes
	let counter = new Map()

	//simple function to increment an author's like count
	const updateCounter = (author, likes) => {
		counter.set(author,
			(counter.get(author) === undefined)
				? likes : counter.get(author) + likes)
	}

	//run through each blog and increment like-count
	for (const blog of blogs) updateCounter(blog.author, blog.likes)
	
	//return author with most likes in map
	const reducer = (top, current) =>
		(current[1] > top[1]) ? current : top
	const topLikes = [...counter.entries()].reduce(reducer)

	return {author: topLikes[0], likes: topLikes[1]}
}

export default {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
