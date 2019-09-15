#include "DHT.h" // Inclui a biblioteca do sensor do DHT11
 
#define DHTPIN A1 // Pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11

DHT dht(DHTPIN, DHTTYPE); // Define o pino de armazenamento e especifica o tipo DHT11
 
void setup() 
{
  Serial.begin(9600);
  dht.begin();
}
 
void loop() 
{
  // A leitura da temperatura e umidade pode levar 250ms!
  // O atraso do sensor pode chegar a 2 segundos.
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float temp= t;
  // etsta se retorno é valido, caso contrário algo está errado.
  if (isnan(t) || isnan(h)) 
  {
    Serial.println("Falha na leitura do sensor DHT");
  } 
  else
  {
    if(t > 20){
      temp = (((20/2)*9)+60)+((t-20)*2);
      Serial.print(temp); // Mostra a temperatura
    }
      
   
    Serial.print(","); // Divide com vírgula
    Serial.println(h); // Mostra a umidade
  }
  
    delay(5000); // Define o atraso em 1 segundo
}
