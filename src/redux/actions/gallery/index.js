import { types } from '../../actionTypes';
import { db, storage } from '../../../../firebaseConfig';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


let getGalleryImagesAPIFlag = true
export const getGalleryImages = () => async (dispatch) => {
    if (getGalleryImagesAPIFlag) {
        dispatch({ type: types.GET_GALLERY_IMAGES_START })
        getGalleryImagesAPIFlag = false
        try {
            const q = query(collection(db, "galleryImages"), where("visible", "==", true));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const updatedData = [];

                querySnapshot.forEach((doc) => {

                    const item = doc.data();
                    updatedData.push(item);
                });
                dispatch({ type: types.GET_GALLERY_IMAGES_SUCCESS, images: updatedData });
            });
        } catch (error) {
            dispatch({ type: types.GET_GALLERY_IMAGES_FAILED })
        }

    }

};
let getGalleryImagesForAdminAPIFlag = true
export const getGalleryImagesForAdmin = () => async (dispatch) => {
    if (getGalleryImagesForAdminAPIFlag) {
        dispatch({ type: types.GET_GALLERY_IMAGES_FOR_ADMIN_START });
        getGalleryImagesAPIFlag = false;
        try {
            const q = collection(db, "galleryImages");
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const updatedData = [];
                querySnapshot.forEach((doc) => {
                    const item = doc.data();
                    updatedData.push(item);
                });
                dispatch({ type: types.GET_GALLERY_IMAGES_FOR_ADMIN_SUCCESS, images: updatedData });
            });
        } catch (error) {
            dispatch({ type: types.GET_GALLERY_IMAGES_FOR_ADMIN_FAILED });
        }
    }
};

export const uploadImageDataInGallery = (data, callback) => async (dispatch) => {
    try {
        let obj = { ...data };
        if (obj.file) {
            const file = obj.file;
            const galleryImages = ref(storage, `galleryImages/${obj.NAME}`);

            await uploadBytes(galleryImages, file);
            const downloadURL = await getDownloadURL(galleryImages);
            obj.IMAGE_URL = downloadURL;
            delete obj.file;
        }
        const galleryImagesRef = doc(collection(db, 'galleryImages'), obj.ID);
        await setDoc(galleryImagesRef, obj, { merge: true });
    } catch (error) {
        console.log("error=============", error)
    } finally {
        if (callback) {
            callback()
        }
    }
}

export const deleteImageFromGallery = (image) => async (dispatch) => {
    try {
        const { ID, NAME } = image;
        const storageRef = ref(storage, `galleryImages/${NAME}`);
        await deleteObject(storageRef);
        const galleryImagesRef = doc(collection(db, 'galleryImages'), ID);
        await deleteDoc(galleryImagesRef);
    } catch (error) {
        console.log("error=============", error);
    }
}