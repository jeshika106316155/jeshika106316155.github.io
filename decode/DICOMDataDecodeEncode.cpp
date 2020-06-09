#include "stdafx.h"
#define MAXNumber 4000000000
using namespace std;

/* Add by chhsiao 20151130 , table for Transfer syntax
typedef	struct	_TransferSyntaxAlias
	{
	char	*TransferSyntaxUID;
	int		Alias;
	}	TransferSyntaxAlias;


TransferSyntaxAlias	TransferSyntaxAliases[] =
	{
		{ "1.2.840.10008.1.2", TSA_IMPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.1", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.2", TSA_EXPLICIT_BIG_ENDIAN },
		{ "1.2.840.10008.1.2.4.50", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.51", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.52", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.53", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.54", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.55", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.56", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.57", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.58", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.59", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.60", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.61", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.62", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.63", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.64", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.65", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.66", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ "1.2.840.10008.1.2.4.70", TSA_EXPLICIT_LITTLE_ENDIAN },
                { "1.2.840.10008.1.2.5", TSA_EXPLICIT_LITTLE_ENDIAN },
		{ NULL, 0 }
	};
*/


Untie	::	Untie()//重新建制ok but再次呼叫可能會出錯~!!!!
{
	DataElementCount = 0;
	table_conter = 0;
	isLitteEndian = true;
	Explicit = true;
	tab = 0;
}
bool Untie :: LoadTable()
{
	FILE	*fp;
	char value[100];
	char *p,*a;
	errno_t err;


	err = fopen_s(&fp,"VR.txt","r");
	if(err!=0)
	{
		return false;
	}

	while(!feof(fp))
	{
		fgets(value,100,fp);
		strcpy_s(ex_data[table_conter].Group,strtok_s(value, "\t (),",&p));
		strcpy_s(ex_data[table_conter].Element,strtok_s(NULL, "\t(),",&p));
		strcpy_s(ex_data[table_conter].VR,strtok_s(NULL, "\t(),",&p));
		ex_data[table_conter].tag_name = strtok_s(NULL, "\t",&p);
		table_conter++;
	}
	fclose(fp);

	return true;
}
bool Untie :: LoadDICOMFile	(char	*filename )//是否一定會跑完
{
	FILE *fp;
	errno_t err;
	unsigned int Offset = 0, fileSize,Length;
	unsigned short	text_Group, text_Element,tempShortInt;  // int textGroup textElement 命名不合適, chhsiao
	char s[256],Group[5],Element[5],VRType[4],strData[256];
	void *ptr,*Data;
	int text_vr = 0;
	string tagname;

	//Add by chhsiao 20151130
	bool has00020010Tag, NextIsExplicit, NextIsLitteEndian;
	has00020010Tag =false; 
	unsigned short PreGroup;
	err = fopen_s(&fp,filename,"rb");
	if(err!=0)
	{
		printf("讀取 DCM 檔地址錯誤");
		return false;
	}

	fseek (fp, 0, SEEK_END);
	fileSize =ftell (fp);

	fseek(fp, 128, SEEK_SET);
	fread(s, 1, 4, fp);
	s[4] = '\0';

	if(strcmp(s, "DICM"))  // not equal
		fseek(fp, 0, SEEK_SET);
	else
		Offset = 128+4;



	fread(s,1,6,fp);// 判斷第一個 DataElement  是否有 VRTyupe

	if(s[5]>10)
		Explicit = true;  //EXPLICIT
	else
		Explicit = false; //IMPLICIT

	fseek(fp, Offset, SEEK_SET);
	fileSize = fileSize -8;// reserved file size is too small for a data element 
	
	

	while ( Offset < fileSize)
	{
		ptr = (void *) (&text_Group);
		fread (ptr, 2, 1, fp);

		ptr = (void *) (&text_Element);
		fread (ptr, 2, 1, fp);

		Offset =  Offset + 4;

		sprintf_s(Group, "%04x", text_Group);
		sprintf_s(Element, "%04x", text_Element);
		if(has00020010Tag ==true && PreGroup == 2 && text_Group !=2)
		   {Explicit =NextIsExplicit;
		    isLitteEndian =NextIsLitteEndian; }

		PreGroup =  text_Group;
		/* 不應該寫在這裡, strData 尚未讀取
		if (_stricmp("0002", Group) == 0 && _stricmp("0010", Element) == 0  )//傳輸語法的判斷
		{  //Add by chhsiao 20151130
			if (_stricmp("1.2.840.10008.1.2\0", strData) == 0 )//隱含little Endian
			{
				NextIsExplicit = false;
				NextIsLitteEndian = true;
				has00020010Tag =true;
			}
			else if (_stricmp("1.2.840.10008.1.2.1\0", strData) == 0 )//外顯little Endian
			{
				NextIsExplicit = true;
				NextIsLitteEndian = true;
				has00020010Tag =true;
			}
			else if(_stricmp("1.2.840.10008.1.2.1\0", strData) == 0)//外顯big Endian
			{
				NextIsExplicit = true;
				NextIsLitteEndian = false;
				has00020010Tag =true;
			}
			else if(_stricmp("1.2.840.10008.1.2.1\0", strData) == 0)//隱含little Endian
			{
				NextIsExplicit = false;
				NextIsLitteEndian = true;
				has00020010Tag =true;
			}	
		}
		*/
		for(int i = 0;i<table_conter;i++)
		{
			if(_stricmp(ex_data[i].Group, Group) == 0 &&_stricmp(ex_data[i].Element, Element) == 0)
			{
				strcpy_s(VRType,ex_data[i].VR);
				tagname = ex_data[i].tag_name;
				text_vr = 1;
				break;
			}
		}
		if(text_vr == 0)
		{
			tagname = "NULL";
			VRType[0] = 'U';
			VRType[1] = 'N';
			VRType[2]= '\0';
		}	
		text_vr = 0;


		if(_stricmp("fffe", Group) == 0 && _stricmp("e00d", Element) == 0 || _stricmp("fffe", Group) == 0 && _stricmp("e0dd", Element) == 0 || _stricmp("fffe", Group) == 0 && _stricmp("e000", Element) == 0)
		{
			ptr =(void *) VRType;
			fread (ptr, 4, 1, fp);  // Read VRType
			Offset = Offset + 4;  // Add by chhsiao
			VRType[0] ='*';
			VRType[1] ='*';
			VRType[2] ='\0';
			Length = 0;
			if(_stricmp("fffe", Group) == 0 && _stricmp("e000", Element) == 0)
			{
				tab++;
			}
			else if(_stricmp("fffe", Group) == 0 && _stricmp("e00d", Element) == 0 )
			{
				tab--;
			}

		}

		else if( Explicit == true)     //  Explicit = true) 邏輯判斷式寫錯
		{
			ptr =(void *) VRType;
			fread (ptr, 2, 1, fp);  // Read VRType
			VRType[2] ='\0';
			Offset =  Offset + 2;

			if(strcmp(VRType, "OB") == 0 || strcmp(VRType, "OW") == 0 || strcmp(VRType, "OF") ==0|| strcmp(VRType, "SQ")==0  || strcmp(VRType, "UT")==0 || strcmp(VRType, "UN")==0)
			{ 
				ptr = (void *) (& Length);
				fread (ptr, 2, 1, fp);
				fread (ptr, 4, 1, fp);
				Offset =  Offset + 6;
				if(Length > MAXNumber)
					Length = 0;
			}
			else
			{ 
				ptr = (void *) (&tempShortInt);
				fread (ptr, 2, 1, fp);
				Length = tempShortInt;
				Offset =  Offset + 2;
			}
		}
		else
		{
			ptr = (void *) (& Length);
			fread (ptr, 4, 1, fp);
			Offset =  Offset + 4;
			if(Length > MAXNumber)
				Length = 0;
		}

	//考慮7fe0 image data是否要讀少一點(讀太多可能會爆掉)
        if(Length < 256 )
		{
		Data = malloc(Length); // malloc should has delete
		fread (Data, Length, 1, fp);printf("%p",&Data);
		DataToString(Data,Length, VRType, strData); 
		free (Data);
		}
		else 
		{Data = malloc(256); // malloc should has delete
		fread (Data, 256, 1, fp);
		fseek(fp, Offset  + Length-256 , SEEK_SET);
		DataToString(Data,256, VRType, strData);
		free (Data);
		}
	

	 if (_stricmp("0002", Group) == 0 && _stricmp("0010", Element) == 0  )//傳輸語法的判斷
		{  //Add by chhsiao 20151130
			if (_stricmp("1.2.840.10008.1.2\0", strData) == 0 )//隱含little Endian
			{
				NextIsExplicit = false;
				NextIsLitteEndian = true;
				has00020010Tag =true;
			}
			else if (_stricmp("1.2.840.10008.1.2.1\0", strData) == 0 )//外顯little Endian
			{
				NextIsExplicit = true;
				NextIsLitteEndian = true;
				has00020010Tag =true;
			}
			else if(_stricmp("1.2.840.10008.1.2.2\0", strData) == 0)//外顯big Endian
			{
				NextIsExplicit = true;
				NextIsLitteEndian = false;
				has00020010Tag =true;
			}
			else if(_stricmp("1.2.840.10008.1.2.1\0", strData) == 0)//隱含little Endian
			{
				NextIsExplicit = false;
				NextIsLitteEndian = true;
				has00020010Tag =true;
			}	
		}


		DataElement * CurrentDE;
		CurrentDE = new  DataElement();

		strcpy_s(CurrentDE->Group,Group);
		strcpy_s(CurrentDE->Element,Element);
		strcpy_s(CurrentDE->VR,VRType);
		CurrentDE->Length  =Length;
		CurrentDE->tab = tab;
		CurrentDE->tag_name = tagname;
		CurrentDE->Offset =Offset;

        Offset =  Offset +  Length;	

		CurrentDE->data =Data;  // Add Data memory point to current data element
		AddElement(CurrentDE);
	}

	fclose(fp);
	return true;
}
bool Untie	::DataToString(void * Data,int DataLength, char * VRType, char * ReturnData)
{
	unsigned int UL;
	int SL,i, maxLength;
	unsigned short US;
	short SS;
	char *strData,*ow2;
	strData =(char *) Data;	
	float FL;
	double FD;
	unsigned char Ob;
	unsigned short Ow;


	if(DataLength ==0)  
	{ 
		Data = "";
		ReturnData =  "";
		return true;
	}
	if(strcmp(VRType, "**") == 0)
	{
		sprintf_s(ReturnData,DataLength,"");
		return true;
	}

	if(strcmp(VRType, "AE") == 0)
	{;}
	if(strcmp(VRType, "AS") == 0)
	{;}
	if(strcmp(VRType, "AT") == 0 )
	{
		UL=(*((unsigned int *) Data));
		sprintf_s(ReturnData,DataLength,"%d",UL);
		return true;
	}
	if(strcmp(VRType, "CS") == 0)
	{;}
	if(strcmp(VRType, "DA") == 0)
	{;}
	if(strcmp(VRType, "DS") == 0)
	{;}
	if(strcmp(VRType, "DT") == 0)
	{;}
	if(strcmp(VRType, "FL") == 0)
	{
		FL=(*((float *) Data));
		sprintf_s(ReturnData,DataLength,"%f",FL);
		return true;
	}
	if(strcmp(VRType, "FD") == 0)
	{
		FD=(*((double *) Data));
		sprintf_s(ReturnData,DataLength,"%f",FD);
		return true;
	}
	if(strcmp(VRType, "IS") == 0)
	{;}
	if(strcmp(VRType, "LO") == 0)
	{;}
	if(strcmp(VRType, "LT") == 0)
	{;}
	if(strcmp(VRType, "OB") == 0)
	{
		Ob=(*((unsigned char *) Data));
		sprintf_s(ReturnData,20,"%x",Ob);
		//sprintf_s(ReturnData,DataLength+10,"%x",Data);
		return true;
	}
	if(strcmp(VRType, "OF") == 0)
	{;}
	if(strcmp(VRType, "OW") == 0)
	{
		//sprintf_s(ReturnData,50,"");
	 	Ow = (*((unsigned short *) Data));
		sprintf_s(ReturnData,20,"%x",Ow);
		return true;

	}
	if(strcmp(VRType, "PN") == 0)
	{;}
	if(strcmp(VRType, "SH") == 0)
	{;}
	if(strcmp(VRType, "SL") == 0)
	{
		SL=(*((int *) Data));
		sprintf_s(ReturnData,DataLength,"%d",SL);
		return true;
	}
	if(strcmp(VRType, "SQ") == 0)
	{
		sprintf_s(ReturnData,DataLength,"");
		return true;
	}
	if(strcmp(VRType, "SS") == 0)
	{
		SS=(*((short *) Data));
		DataLength+=100;
		sprintf_s(ReturnData,DataLength,"%d",SS);
		return true;
	}
	if(strcmp(VRType, "ST") == 0)
	{;}
	if(strcmp(VRType, "TM") == 0)
	{;}
	if(strcmp(VRType, "UI") == 0)
	{;}
	if(strcmp(VRType, "UL") == 0  )
	{
		UL=(*((unsigned int *) Data));
		DataLength+=100;
		sprintf_s(ReturnData,DataLength+100,"%d",UL);
		return true;
	}
	if(strcmp(VRType, "UN") == 0)
	{;}
	if(strcmp(VRType, "US") == 0)
	{
		US=(*(( unsigned short*) Data));
		
		sprintf_s(ReturnData,DataLength,"%d",US);
		return true;
	}
	if(strcmp(VRType, "UT") == 0)
	{;}



	maxLength = DataLength;
	if(maxLength >254) 
	{
		maxLength =254; 
	}
	for(i=0; i< maxLength;i++)
	{
		ReturnData[i]= strData[i];
	}
	ReturnData[maxLength] =0;

	return true;


}
bool Untie	::AddElement(DataElement * CurrentElement)
{  
	//first data element
	if(DataElementCount ==0) 
	{
		CurrentElement->NextElement =0; // next element not set yet
		FirstElement =  CurrentElement;
		LastElement  = CurrentElement;
		DataElementCount ++;
		return true;
	}
	//Add element to end of DCMObject
	if((CurrentElement->Group >  LastElement->Group) || (CurrentElement->Group ==  LastElement->Group  &&  CurrentElement->Element > LastElement->Element))//||LastElement->Group == 65534
	{ 
		CurrentElement->PreviousElement = LastElement;  
		LastElement->NextElement =CurrentElement;
		LastElement  = CurrentElement;
		DataElementCount ++;
		return true;
	}

	return false;  //element position not found, process should not be at this point
}
bool Untie	::SaveToXML(char * FileName)
{   
	FILE *fp;
	errno_t err;
	int Offset = 0,Length = 0,tab_change = 0;
	string Group,Element,tagname,tag,sq_tag[10];
	char strData[256];

	err = fopen_s(&fp,FileName,"w");
	if(err!=0)
	{
		printf("取 XML 檔地址錯誤");
		return false;
	}

	fprintf(fp,"<?xml version='1.0' encoding='utf-8' ?> \n");
	fprintf(fp,"<DDO> \n");

	DataElement * IndexElement;
	IndexElement = FirstElement;

	for(int i = 0;i<DataElementCount;i++)
	{
		tab_change = IndexElement->tab;
		Group.assign(IndexElement->Group);//Group = IndexElement->Group;
		Element.assign(IndexElement->Element);//Element = IndexElement->Element;
		Length = IndexElement->Length;
		Offset =IndexElement->Offset;

		for(int j = 0;j<tab_change;j++)
			fprintf(fp,"	");
		printf("<Tag%s%s  VRName ='%s' Length ='%d' Offset ='%d' > \n",IndexElement->Group, IndexElement->Element,IndexElement->VR,Length,Offset);
		fprintf(fp,"	<Tag%s%s FieldName ='%s' VRName ='%s' Length ='%d' Offset ='%d' >",IndexElement->Group, IndexElement->Element, IndexElement->tag_name.c_str(),IndexElement->VR,Length,Offset );

		DataToString(IndexElement->data,Length, IndexElement->VR, strData);
		if(Length != 0)
			fprintf(fp,"%s",strData);
		fprintf(fp,"</Tag%s%s> \n",IndexElement->Group, IndexElement->Element);
		IndexElement = IndexElement->NextElement;

	}

	fprintf(fp,"</DDO> \n");
	fclose(fp);
	return true;

}