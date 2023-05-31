#include <iostream>
#include <stdlib.h>  /* srand, rand */
#include <time.h>    /* time */
#include <string>

int main(int argc, char *argv[]){
   FILE *fp;
   fp = fopen("file.txt", "w");
   int val{0};

   /* initialize random seed: */
   srand (time(NULL));
   
   /* for( int i=0;i<10000;i++){  
   }*/
   int i{0};
   int n{0};
   if (argc >= 2)
   {
      n = std::stoi(argv[1]);
   }else{
      n=1000000;
   }
   printf("generating %d numbers\n", n);
   
   while( i<n ){
      val = rand() % n;    // generate number between 1 and 1000000 //
      fprintf(fp, "%d\n", val);  // printf("%d\n", val); //
      i++;
   }
   
   printf("Numbers saved >> file.txt\n");
   printf("Successful generation\n");
   fclose(fp);  
   return 0;
}
