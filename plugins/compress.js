import Compress from 'compress.js'

export default function ({ }, inject) {

	const compressFile = new Compress()
	const compress = async (file) => {
		const data = await compressFile.compress([file], {
			size: 1, // the max size in MB, defaults to 2MB
			quality: .75, // the quality of the image, max is 1,
			maxWidth: 1920, // the max width of the output image, defaults to 1920px
			maxHeight: 1920, // the max height of the output image, defaults to 1920px
			resize: true, // defaults to true, set false if you do not want to resize the image width and height
			rotate: false, // See the rotation section below
		})
		const getData = data[0];
		return `${getData.prefix}${getData.data}`
	}
	inject('compress', compress)
}
