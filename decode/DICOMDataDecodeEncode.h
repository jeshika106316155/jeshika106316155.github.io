#include "stdafx.h"
using namespace std;


class   DataElement
{
public:
	char Group[5],Element[5],VR[3];
	unsigned  int	Length,Offset,tab;
	string tag_name;
	void *data;
	DataElement * PreviousElement, *NextElement;
};
class   ex_table
{
public:
	string tag_name;
	char Group[5],Element[5],VR[3];
};

class	Untie
{
	bool DataToString(void * Data,int DataLength, char * VRType, char * ReturnData);
	bool AddElement(DataElement * CurrentElement);
public:
	Untie();
	bool LoadTable();
	bool LoadDICOMFile(char * FileName);
	bool SaveToXML(char * FileName);
	
	DataElement *FirstElement, * LastElement;
		bool isLitteEndian ,Explicit;
	int DataElementCount,tab;
	ex_table ex_data[4000];
	int table_conter;

};
