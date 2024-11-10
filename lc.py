#lung cancer python
import sys
import numpy as np
from keras.models import model_from_json
from keras.preprocessing.image import load_img, img_to_array  # Import these functions

# Set UTF-8 encoding for the console output
sys.stdout.reconfigure(encoding='utf-8')

# Load the model
json_file = open("./lungCancer.json", "r")
model_json = json_file.read()
json_file.close()
model = model_from_json(model_json)
model.load_weights("./lungCancer.h5")

def predict(model, img_path, target_size=(64, 64)):
    # Load the image
    test_image = load_img(img_path, target_size=target_size)

    # Convert the image to an array and expand dimensions to match the model input shape
    test_image_array = img_to_array(test_image)
    test_image_array = np.expand_dims(test_image_array, axis=0)

    # Predict the class of the image
    result = model.predict(test_image_array,verbose=0)
    
    # Map the result to a class label
    prediction = 'normal' if result[0][0] == 1 else 'cancer'

    # Print the prediction
    print(prediction,end="",sep="")
    return prediction

# Provide the image path
image_path = "./image.jpg"
disease = predict(model, image_path)
sys.stdout.flush()