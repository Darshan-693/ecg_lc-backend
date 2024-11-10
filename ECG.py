import sys
import numpy as np
import cv2
#from tensorflow import keras
from keras.models import model_from_json
json_file = open("./heartDisease1.json", "r")
model_json = json_file.read()
json_file.close()
model = model_from_json(model_json)
model.load_weights("./heartDisease1.h5")
label = ['Myocardial Infarction','History of MI ','abnormal heartbeat','Normal']
sys.stdout.reconfigure(encoding='utf-8')

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (224, 224))
    image = image.astype('float32') / 255.0 
    image = np.expand_dims(image, axis=0)
    return image
def predict_image(image_path, model, labels):
    image = preprocess_image(image_path)
    prediction = model.predict(image,verbose=0)
    predicted_class = np.argmax(prediction, axis=1)[0]
    return labels[predicted_class]

image = "./image.jpg"
disease = predict_image(image,model, label)
print(disease,end="",sep="")
sys.stdout.flush()