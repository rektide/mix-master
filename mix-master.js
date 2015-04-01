var getPropertyDescriptor= require('get-property-descriptor')

function MixMaster(o, slot, get, set, src){
	if(!src){
		src= o
	}

	var underlyingDescriptor= getPropertyDescriptor(src, slot)
	var newDesc= {
		enumerable: underlyingDescriptor && underlyingDescriptor.enumerable || false,
		configurable: true
	}

	var _get,
	  _set
	if(underlyingDescriptor && underlyingDescriptor.writable === undefined){
		if(newDesc.get){
			_get= function(){
				return underlyingDescriptor.get.call(this)
			}
		}
		if(newDesc.set){
			_set= function(val){
				underlyingDescriptor.set.call(this, val)
			}
		}
	}else{
		var value= underlyingDescriptor && underlyingDescriptor.value || undefined
		_get= function(){
			return value
		}
		_set= function(val){
			value= val
		}
	}

	if(get){
		newDesc.get= get
		if(_get){
			get._get= _get
		}
		if(_set){
			get._set= _set
		}
	}
	if(set){
		newDesc.set= set
		if(_set){
			set._set= _set
		}
		if(_get){
			set._get= _get
		}
	}
	Object.defineProperty(o, slot, newDesc)
}

module.exports= MixMaster
