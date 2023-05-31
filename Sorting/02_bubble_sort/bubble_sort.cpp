#include <iostream>

int bubble_sort(int *A, int tam) {
   int aux{0};
   int flag{0};
   for( int j=0;j<tam-1;j++){
      flag=0;
      for( int i=0; i<tam-j-1; i++){
         if( A[i]>A[i+1] ){
            aux=A[i];
            A[i]=A[i+1];
            A[i+1] = aux;
            flag=1;
         }
      }
      if(flag==0)
         break;
   }
   return 0;
}

int main() {

   FILE *fp;
   int val{0};
   int tam{100000};
   int A[tam] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   fp = fopen("file.txt", "r");
   int i{0};

   while (i < tam) {
      fscanf(fp, "%d\n", &val);
      A[i] = val;
//      printf("val %d\n", val );
      i++;
   }
   fclose(fp);

   bubble_sort(A, tam);
   fp = fopen("output.txt", "w");
   i = 0;
   while (i < tam) {
      fprintf(fp, "%d\n", A[i]);
      i++;
   }
   fclose(fp);

  return 0;
}
