import Fire from './firebase' 
import uuid from 'uuid'

export const uploadImageAsync = async (uri, storage) => {
	const response = await fetch(uri);
	const blob = await response.blob();
	const ref = Fire
		.storage()
		.ref(storage)
		.child(uuid.v4())

	const snapshot = await ref.put(blob)
	return snapshot.ref.getDownloadURL()
}
