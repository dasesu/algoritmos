#include <iostream>


int binarySearch( int A[], int low, int high, int key ){
   while(low <= high ){
      int mid = (low + high)/2;
      if( A[mid] < key ){
         low = mid+1;
      }else if( A[mid] > key ){
         high = mid-1;
      }else{
         return mid;
      }
   }
   return -1;
}


int main( int argc, char *argv[]){
   FILE *fp;
   int tam{1000000};
   int A[tam] = {}; // lo mismo que crear un for(int i=0;i<tam;i++){ A[i] = 0; }
   int val{0};
   fp = fopen("output.txt", "r");
   int i{0};
   while (i < tam) {
      fscanf(fp, "%d\n", &val);
      A[i] = val;
      i++;
   }
   fclose(fp);
   binarySearch( A, 0,1000000-1,53);
   
}
