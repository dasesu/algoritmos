#include <iostream> 

int x, y, z;

int a2(int &y, int z);

void a1( int x, int &y ){
   //printf("%d, %d\n", x, y);
   x=4;
   printf("%d, %d, %d\n", x, y, z );
   y = a2(z, y);
}


int a2(int &y, int z){
   x=5;
   y=6;
   z=7;
   printf("%d, %d, %d\n", x, y, z );
   return 2*x;
}


int main( int argc, char *argv[] ){
   x=1;
   y=2;
   z=3;
   a1(z,x);
   printf("%d, %d, %d\n", x, y, a2(y, x) );
   return 0;
}
