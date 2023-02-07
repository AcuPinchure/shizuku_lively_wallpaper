import os

path = 'D:/Users/s9200/Documents/lively/assets/sprite/dress/thumbnail'

for i in os.listdir(path):
    if i.startswith('_'):
        os.rename(path+'/'+i, path+'/'+i[6:])