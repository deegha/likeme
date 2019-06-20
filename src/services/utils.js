import Fire from './firebase' 
import uuid from 'uuid'
import request from 'superagent'

export const CLOUDINARY_UPLOAD_PRESET = 'x8pebuvf'
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/duqpgdc9v/upload'

export const uploadImageAsync = async (uri, storage) => {
	console.log(uri)
	const response = await fetch(uri);
	const blob = await response.blob();
	const ref = Fire
		.storage()
		.ref(storage)
		.child(uuid.v4())

	const snapshot = await ref.put(blob)
	return snapshot.ref.getDownloadURL()
}


// export const uploadImageAsync = async (file) => {


// 	const response = await fetch(file);
// 	const blob = await response.blob();

// 	try {
// 	let response = await request
// 	.post(CLOUDINARY_UPLOAD_URL)
// 	.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
// 	.field('file', blob)


// 	console.log(response, "cloudinary response")
// 	if(response.body){
// 		return response.body.secure_url
// 	}else {
// 		return ""
// 	}
// 	}catch(err) {
// 		console.log(err)
// 	}
// }