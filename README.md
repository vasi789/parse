As there are no details specifications for the input data.
Assumptions made at my end for the input data:
{
	"data": "JOHN0000MICHAEL0009994567"
}

The name in the string can vary. 
Assumed the zeros between the names are of fixed lenght 4 and 3. If any of the lenght go up or down it returns 400 bad request error. 
Assumed the numbers given in the data input is of fixed lenght. If the length of the numbers go up or down returns 400 bad request error.

################################################################
Clone the project 
npm install 
npm run dev to start 
