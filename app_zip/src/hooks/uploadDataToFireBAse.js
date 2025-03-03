import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./NewFireBaseCOnfig";  // Import the storage instance


const uploadPDFToFirebase = async (fileUri) => {
    try {
      const filename = `Interview_${Date.now()}.pdf`; // Use .pdf extension
      const storageRef = ref(storage, `Interview_PDFDATA/${filename}`); // Store in a separate folder for PDFs
      const response = await fetch(fileUri);
      const fileBlob = await response.blob();
      const snapshot = await uploadBytes(storageRef, fileBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;  
    } catch (error) {
      console.log("Error uploading PDF:", error);
    }
  };
  
  export default uploadPDFToFirebase;
