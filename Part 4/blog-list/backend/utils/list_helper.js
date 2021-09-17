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
	const favBlog = (top, current) =>
		(current.likes > top.likes) ? current : top

	return blogs.reduce(favBlog, {likes: 0})
}

export default {
	dummy,
	totalLikes,
	favoriteBlog
}
