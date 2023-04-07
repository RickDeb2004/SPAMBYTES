import os
import numpy as np
import pandas as pd
import pickle


data = np.load(os.path.dirname(__file__) + "/data.npy", allow_pickle=True)

from sklearn.impute import SimpleImputer
imp = SimpleImputer(missing_values=np.nan, strategy='mean')
imp.fit(data)
data = imp.transform(data)

X = pd.DataFrame(data).iloc[:,0:2]
y = pd.DataFrame(data).iloc[:,2]

y = np.reshape(y, (-1, 1))

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y)


from sklearn.impute import SimpleImputer
imp = SimpleImputer(missing_values=np.nan, strategy='mean')
imp.fit(y_train)
y_train = imp.transform(y_train)
y_test = imp.transform(y_test)

from sklearn.neighbors import KNeighborsRegressor
knn = KNeighborsRegressor(n_neighbors=10).fit(X_train, y_train)

y_pred = knn.predict(X_test)

from sklearn.metrics import mean_squared_error

error = mean_squared_error(y_test, y_pred)
print(error**(1/2))

with open(os.path.dirname(__file__) + "/model.pkl","wb") as f :
    pickle.dump(knn, f)