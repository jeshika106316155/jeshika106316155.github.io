// MI_LIB.cpp: 主要專案檔。
#include "stdafx.h"
using namespace std;

int main(array<System::String ^> ^args)
{
	printf("Dictionary loaded...\n");
	LoadDictionary("dd.txt");   // DICOM tags and VR dictionary
	DICOMDataObject DDO;  // DICOM Decode Objact

   char str[] = "d:\\img\\image-000001.dcm";
   char str2[] = "d:\\img\\image-000001.xml";
   DDO.ReadDICOMFileObject(str, 0, false, true);  */
   DDO.DecodeRetToXML(str2);
  
   //char str[] = "d:\\img\\2018\\NEMA_Brain\\IM_0050";
    //char str2[] = "d:\\img\\2018\\NEMA_Brain\\IM_0050.xml";
   	//DDO.ReadDICOMPart10File(str);
	
   //int ReadDICOMFileObject(char * FileName, unsigned int DDOOffset, bool inIsExplicitVR,bool inIsLittleEanian);
	//DDO.ReadDICOMFileObject(str, 0, false, true);
 	getchar();
	return 0;
}
