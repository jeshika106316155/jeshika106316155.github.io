read DICOM part10 file 
DICOMDataObject:: bool ReadDICOMPart10File(char *FileName);
若非 part10 file 須知道(猜) 其 VR and Endian `, DDOOffset 一般為 0
DICOMDataObject:: bool ReadDICOMFileObject(char * FileName, unsigned int DDOOffset, bool inIsExplicitVR,bool inIsLittleEndian);  // if we can know (guest) transfer syntax, such that in association processes 
