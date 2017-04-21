root = (window ? global).Leisure

for k,v of Org
  root[k] = v

root.yaml = Yaml
