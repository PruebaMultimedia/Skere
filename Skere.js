(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Skere_atlas_1", frames: [[554,1352,335,205],[1364,0,538,629],[0,1349,552,205],[891,1352,421,145],[699,1145,825,205],[0,951,697,396],[1526,1145,503,205],[699,951,661,188],[891,1499,224,103],[1563,1352,201,157],[1766,1352,230,133],[1904,173,80,134],[1314,1352,247,158],[1117,1512,204,68],[1323,1512,204,68],[1529,1512,204,68],[0,0,1362,949],[0,1556,204,68],[1766,1487,252,103],[1986,173,57,92],[1904,0,135,171],[1364,631,512,512]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_8 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits10 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits11 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits12 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits13 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits14 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits16 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits17 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits18 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits4 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits6 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits7 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits8 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits9 = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.restart = function() {
	this.initialize(ss["Skere_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tipo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Mapadebits4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1362,949);


(lib.Símbolo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Reinicio = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.restart();
	this.instance.setTransform(0,0,0.3074,0.3074);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,157.4,157.4);


(lib.Ojooos = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(336.75,-355,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(48.65,-278.3,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkqCfQh8hCAAhdQAAhdB8hCQB8hCCuAAQCvAAB7BCQB8BCABBdQgBBdh8BCQh7BDivAAQiuAAh8hDg");
	this.shape.setTransform(42.25,22.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-355,504.3,400.2);


(lib.Movimiento = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAOmBISQjYgLjYg1QhNgUgwgVQhDgdgpgrQg/hCgWh1QgLg4gIicQgNkGhOk/QgvjBh0l2QgzimgbhQQgtiIgrhqIgthuQgWBagmBjQgpBrhOCbQhFCJhcCpQg1Bgh0DPIhuDEQgbAvgDAdQgEAcANAiQAIAWAUAkIB8DdQBVCYAuBKQAiA2AMAaQAWAvAAAoQAAAwgjAkQgkAlgrgMQgigJgbgrQgbg1gPgYQgIgLgegkQgYgdgLgVQgIgRgKgkQgLglgIgRQgKgTgWgbQgagggIgMQgNgUgNggIgWg2QgQghgfgwIgzhQQg6hmARhPQAJgrApg5QA1hMAKgUQALgWAOgpQAPguAIgSQANgeAYgkIAqg/QAxhIA3hgQAgg3A/h1IBni+QAohKARgmQAdg9AohwIBYjvQALgdAOgUQgJglgFgiQgQhmAJiBQAGhLAWicQBkq0BEq1IgUAGQg5AVgpAeQgdAVgdAhQgSAUggApIhJBiQhGBjg4BiQhLCChUC5QgwBrgZAtIgZApQgOAZgJASQgZAzgUBXQgXBegPBnQgHAvgKAYQgOAmgcAPQgjASgpgWQgngVgPgoQgOgiADguQACgdAKg1IAgihQAMg9AMgjQANgmAcgxIAxhTQAYgoASgjQAlhHAqhnQAYg9ARgbQALgRAWgbIAigqQAQgWAXgpQAaguALgRIAggtIAhgrIAthCQBjiUBuhKQBHgvBRgVQAkgJAjgDQAakbAVkcIACgVIgJAAQhUgGhigmQg9gXhvg4Qhpg1g2ghQhWgzg7g2Qgsgngvg4Qgegkg0hFQh6ifg3hTQhdiKgzh7Qg/iVgdi2QgYibgCi+QgClBA6k/QA6k9BzksQBXjfBhiUQBgiQCmijQCCiABwhNQCOhiCMgmQCygvDFAmQC5AkCrBnQCXBbCUCQQB1BzCJCrQBABPApA8QA2BOAkBHQA2BrAkCFQAdBtAUCPQAyFZgUFfQgUFehZFTQglCOgsBeQg5B8hTBNQgrAohKAvIh8BOQg8AphTBHIiLB2QiVB5ipBZQhsA5hZAbQgWAGgSFgIgFBtIgBAQIgCAxQAlAbAiA4QA/BnAHAJQALANAWAWIAhAkQAPARASAZIAeAtIArBCQAYAlANAfQAMAeAMAvIAUBOQAOAyAlBhQBODfAEFiIgBEoQgBCzAJB1QAFBDgBAbQgDA0gSAlQgVArgvATQgxAUgkgbQgdgWgIgtQgFgfAEg0QAqn1gvnxQgJhbgMgsQgJgggag/Qgag/gJghQgFgQgOhKQgKg4gOghQgQgkghgsIg8hKQgrg5gqhQIgKgUIgSCxQg+JahWJlQgSCCgGBAQgJBtAIBXQAIBdAhBxQAUBFAvCCQDXJbBZE6QCQIFAaGsQACAwAFAZQAIAoAUAZQAYAfAtARQAdALA4AKIFUA9QAqAHAXAIQAkALAXASQAcAVAKAiQALAjgRAbQgRAcgnAKQgVAFgeAAIgXgBgEgA0hFNQjpAQjyDOQjECoiTDsQiJDdhUEIQiOHEAKJZQADCyATB7QAZCiA7B7QAcA7AuBFQAaAnA8BTQBfCCA1A/QBXBnBUBEQBcBJCeBQQA3AcAlAOQA0ATAuAGQA1AGA+gLQAxgJA9gVQDDhDCoh5QA0glCEhwQBzhhBKgvQBbg3AsgdQBMgzAng3QAWggATgrQANgfAPgzQBqlVAglmQAflngsliQgOhqgShPQgWhjghhRQgmhZg/hgQgwhIhOhiQiijLiMh6Qi2iei+hBQh5gqhvAAIgnABg");
	this.shape.setTransform(142.6679,504.2711);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("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");
	this.shape_1.setTransform(104.3243,502.7706);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("EgbIBK6QgcgNgRgjQgLgYgJgsQgji1gIheQgNiaAfh3QAYhaAvgmQAXgTAjgNQAWgIArgKIRhkGQB7gdBCgMQBpgUBWgDQAggBAOgDQAagEAQgNQAUgRAPgqQAghhANiTQAKinAJhTQAQiOAtiuQAXhYAxihIgFioQgBguAMggIAEgJIhEukQgLiTgChKQgEheADjaIAInnQhWAyhMBYQhTBghbCnQg+BwhzDmIhHCQQgsBWgRAyQgdBUgSC0QgSCygeBVQgUA4gdAcQgTASgXAHQgZAIgXgHQgdgJgRgdQgQgcAAghQgBgaAJgkIARg8QAQg8AKhfQAOiGADgXQAYigBIiNIA6hqQAjg/AnhTQAXgvAthmQAZg4AOgbQAWgpA5hVQBGhpAogxQBbhyB5hWQBJg0BDgZIAIoKQgegGgXgQQgSgNgWgbIgjgsQgbgfgxgbIhXguQhMgohVhCQgzgnhjhVQhchPgtgtQhJhIgthEQgrhDgihZQgahEgbhjQg9jpgpkrQgZiygilqQgOiSgEhNQgFh8ALhjQAMhlAhh6QAVhKAwiPQBfkbA+iNQBmjlCAiaQBHhUBhhUQBNhDBvhRQCFhgBggzQCFhEB6gQQDJgaDaBqQCyBWC5CrQCUCIBcB9QBwCZBWDRQBBCfBDDsQB2GkAoFTQAwGeg6FiQhCGPjPFDQjfFclLCqQiWBNjNA1QhoAcjDAlIgIG/IAHgCQAjgMApAMQAkALAiAZQAYAUAfAkIA1A6QAUAVArAnQAlAjASAeQAKAPANAeQAOAgAIANQAJAQAVAeQAUAdAJAQQAcAyAPBYQAUB7AGAVQAIAfAYA8QAYA8AJAfQAOAzAJBiQAOCNADBaQAEB/gKBpQgCAcgXCfQgQByAABKIAAA6QgBAggHAYQgIAdgTAVQgVAXgbAEQgeAFgcgSQgbgRgOgdQgUgqADhPQAChVAPh4IAcjMQAfj5gaieQgMhDgjh3QgniBgMg5IgShlQgMg7gQgoQgKgagSgfIghg2QgegwgTgbQgwhFg6g7QgNAJgTAGQgLADgYAFIgoAIIgLHzQgDCAAABAQgBBqAGBVQADA3AKBjIAOCZQAIBlAEDjIAMLoQABAbgCAOQgBAOgEAMIANBGQAOBPArDXQAZB5AKA+QARBlAHBTQAGBNADCcQAFCLAWBbQAKArAhBjQAeBbAKA0QAEASATC/QAMB/AmBJQAwgXCZhcQB7hKBSgeQBNgdA1AMQAiAHAZAYQAaAaACAgQACAfgXAeQgUAaghAQQgXALgoALIhBASQhEAWhhBGQh0BUgrAWQg1AbgzAFQg7AGgpgcQgfgUgWgoQgPgbgSgyQgXhBgKggQgQg2gGgtQgDgegCg7QgBg7gEgeQgFgsgSg+QgVhGgKgjQgsihgPk5QgPkzgeiUQgNBYgQDZQgQDOgjB4QgRA4gVAnQgbAwgmAbQglAbg4AMQgeAHhKAHQilARjLAqQh7AajwA7IsLDAQgqCxArCvIAWBbQAKA0gIAnQgKAvgpAeQgbATgZAAQgQAAgPgIgEAClhG7Qh7A0iHBoQkDDFiKDkQhABog5COQghBTg7CxQg+C4gYBeQgpCcgICBQgICIAbDEIAxFMQAOB6ATD3QAXDXA1COQBYDrDSDFQC1CpEECGQA4AcAmAPQA0AUAuAGQA3AIBFgKQAqgGBQgUQCNgiBFgWQBzgkBTgwQBOgtBUhLQA0gtBehgQBUhVAmgvQBgh4BGisQComhgqoiQgSjeg2kGQgpjChMkaQggh0gTg8QgfhhgihLQh9kTkYj9Qh2hphpg6QiDhJh/gKIgngBQh5AAiCA3g");
	this.shape_2.setTransform(108.6821,477.9076);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("EAH3BNTQgogHgggbQgkgggdg9QgfhIgSgiQgcg4gwg7Qghgqg7g9QgegfgOgSQgWgegFgcQgIgqAYg3QAhg9APgfQATgoAPg6IAXhnQAlicBIiSQBHiRBmh9QAegmALgVQATgjgGgfQgFgfgegaQgSgQgogYQiVhYh/h4QgggegfghQgKARgQAKQgUALgUgFIgEgCIgHAOIi+GJQjAF/i9ELQgZAjgKARQgRAegHAaQgPA9AhBJQARApA4BUQA5BXAyBgQAUAnAKAbQAOAkADAhQADAlgNAiQgNAkgcAVQgdAVgngFQgogFgSgeQgKgSgEghQgFgqgDgLQgHgYgUgcQgZgfgLgRQgUgbgWgxQgehBgHgOIgwhNQgdgugLgiQgMghgDgrQgDgdABgyQAAgpADgYQAEgkALgbQANggArg4QA0hGAwhHQA0hOA9hmQAjg6BJh+QA3hfATguIAbhFQAQgoAPgaQALgQAcglQAaghALgUQANgXASgwQASgxANgXQAMgWAqg0QAggoAOgdIgQgWQg4hWAfgvQALgQATgHQgOi7ABjvQACk1gBg/QgDjTgTigQgFgqgQhqQgNhegGg2QgNhvgDiLQgChTAAinIABklQg/AfhABCQhiBnhMCWQg7B0g6CrQgOApgzCjIhHDjQgZBQgFApQgDAdABA2QABA6gCAZQgCAbgLA7QgKA3gCAeIAAA1QAAAggEAUQgFAdgNAVQgPAYgWALQgcANghgMQgfgKgUgbQghgsAChNQACgmANhHQAOhKACgjQACgegChCQgDg/AEgiQAGg8AghSQAmhcAQgvQARgvAVhSQAYhgAKgiQAVhDAshuQAhhSAKgVQBvj0DIizQApgkAggVQAqgcApgMQAVgGAXgCIACp4IgPgIQjLhuhig9QijhlhzhlQkWj3jWm1Qhzjrgui+Qg3jiAClDQAGoOCMncQCXn9EhmNQCvjyC4h3QBwhJB5ggQCDgiB6ASQCCAUCGBSQBpBAB6ByQIYH2D5LeQD0LShmLmQgbDBguCaQhwF3kPEsQkPEslqCXQhKAeg3ANQhJARg+gIIgCAAIgCG2QAUgDAVABQAqAAAlARQAdANAeAXQAVARAeAeQBWBSA7BFQBJBWAuBVQAZAuAaA9QAQAoAaBHQAbBJALAkQAUA9AHAyQAIAyAABMIAAB/QABA3AIBYIAMCPQAFBPAABiQAAA6gCB2QgBAlgDAWQgEAggMAYQgOAcgZAQQgbASgcgGQgVgEgSgRQgPgQgJgWQgLgegCg7IgOltIgHjCIgFi2QgFhogOhOQgPhVgghfQgdhVgfg/QgnhMgxg3QgNgOgpgqQgjgjgSgXQgggsgSgUQgSgUgUgKIADAJQAHAbgUAbQgTAYgeAKIgBAAIAAEVQAADEACBbQAECgAPB+QAFAzAPBmQAOBlAFAzQALBvADCKQACBYgCChIgGLdQCkDHDdCHQBoA/AdAXQBFA3AXBAQAfBXgsBsQgQAngdAxIg2BUQhRB8hECLQgyBpgUBHQgHAcgOBDQgNA9gKAhIgdBdQgLA2AQAlQALAZAgAdQAsAoAHAIQAVAaAVAxQAcBAAIAPQAMAVAjAvQAgAqAMAbQATAogDApQgDAugfAYQgXASggAAIgSgBgAgkrnQApALAWAjQAQAZAHAiQAyAEA7gSQArgNBOglQCXhIBJgqQB6hFBThLQA/g4A9hOQAwg9A6hYQA/hgAqhMQA1hfAhhXQA7idAejiQBgrXj1q3Qj8rNocnKQhGg7g2giQhIgthEgSQhcgZhnAUQhfAShaA0QhPAuhNBKQg/A8hFBYQktF8iWIFQiIHVgBIaQAACBAJBgQAKB5AZBlQAaBnAzB4QAiBRBDCEQA4BwAlBCQA3BgA3BJQB4CfDICWQB6BcD7CbQAHgMAJgIQATgRAbAAQAMAAAOAEg");
	this.shape_3.setTransform(145.8731,484.9725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-9.8,369.8,989.5999999999999);


(lib.Manos = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-453.45,146,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-155.9,203.4,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("A7ebfQrZrZAAwGQAAwFLZrZQLZrZQFAAQQGAALZLZQLYLZABQFQgBQGrYLZQrZLYwGABQwFgBrZrYg");
	this.shape.setTransform(248.75,248.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-453.4,0,950.9,497.5);


(lib.Corbataa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(486.35,-93.55,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(132.8,-23.85,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AoJObQjXl+AAodQAAocDXl/QDYl+ExAAQEyAADXF+QDYF/AAIcQAAIdjYF+QjXF+kyAAQkxAAjYl+g");
	this.shape.setTransform(73.7,130.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-93.5,898.9,354.6);


(lib.Bocaaas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(510.85,-78.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(169.65,-14.6,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AsYFxQlIiYAAjZQAAjXFIiZQFJiZHPgBQHRABFHCZQFJCZAADXQAADZlJCYQlHCZnRAAQnPAAlJiZg");
	this.shape.setTransform(112.1,52.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-78.2,762.4,182.7);


(lib.Boca = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_11
	this.instance = new lib.Mapadebits14();
	this.instance.setTransform(10,-18,0.7466,0.7466);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(8).to({_off:false},0).wait(1));

	// Capa_9
	this.instance_1 = new lib.Mapadebits12();
	this.instance_1.setTransform(1,-21,0.8809,0.8809);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(6).to({_off:false},0).to({_off:true},1).wait(2));

	// Capa_8
	this.instance_2 = new lib.Mapadebits11();
	this.instance_2.setTransform(25,-29,0.8443,0.8443);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(5).to({_off:false},0).to({_off:true},1).wait(3));

	// Capa_7
	this.instance_3 = new lib.Mapadebits10();
	this.instance_3.setTransform(19,0,0.8428,0.8428);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},0).to({_off:true},1).wait(4));

	// Capa_5
	this.instance_4 = new lib.Mapadebits9();
	this.instance_4.setTransform(42,-49);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3).to({_off:false},0).to({_off:true},1).wait(5));

	// Capa_2
	this.instance_5 = new lib.Mapadebits7();
	this.instance_5.setTransform(0,0,0.7719,0.7719);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({_off:false},0).to({_off:true},1).wait(7));

	// Capa_1
	this.instance_6 = new lib.Mapadebits6();

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:true},1).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-49,207.8,171);


(lib.Símbolo3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Mapadebits18();
	this.instance.setTransform(10,112.5);

	this.instance_1 = new lib.Tipo();
	this.instance_1.setTransform(0,0,1,1,0,0,0,681,474.5);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo3, new cjs.Rectangle(-681,-474.5,1362,949), null);


// stage content:
(lib.Skere = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {Neutral:31,S:34,F:38,Ah:41,L:59,"Ah":61,"L":65,"Ah":72,D:76,"Ah":79,Uh:116,"L":119,"Ah":121};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,31,145,146];
	this.streamSoundSymbolsList[31] = [{id:"SkereeeOriginal",startFrame:31,endFrame:144,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_31 = function() {
		var soundInstance = playSound("SkereeeOriginal",0);
		this.InsertIntoSoundStreamData(soundInstance,31,144,1);
	}
	this.frame_145 = function() {
		var _this = this;
		/*
		Detener un clip de película o un vídeo
		Detiene el clip de película o el vídeo especificado.
		*/
		_this.movieClip_1.stop();
		
		
		var _this = this;
		/*
		Detener un clip de película o un vídeo
		Detiene el clip de película o el vídeo especificado.
		*/
		_this.movieClip_2.stop();
		
		
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.button_3.on('click', function(){
		/*
		Inicie la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
		createjs.Ticker.addEventListener('tick', stage);
		});
	}
	this.frame_146 = function() {
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.button_4.on('click', function(){
		/*
		Mueve la cabeza lectora al número de fotograma especificado en la línea de tiempo y continúa la reproducción desde dicho fotograma.
		Se puede utilizar en la línea de tiempo principal o en líneas de tiempo de clips de película.
		*/
		_this.gotoAndPlay(0);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(31).call(this.frame_31).wait(114).call(this.frame_145).wait(1).call(this.frame_146).wait(1));

	// Capa_2
	this.button_4 = new lib.Reinicio();
	this.button_4.name = "button_4";
	this.button_4.setTransform(1773.7,939.7,1,1,0,0,0,78.7,78.7);
	this.button_4._off = true;
	new cjs.ButtonHelper(this.button_4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_4).wait(146).to({_off:false},0).wait(1));

	// Capa_15
	this.instance = new lib.Ojooos();
	this.instance.setTransform(1118.5,520.4,1,1,0,0,0,42.2,22.6);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.Ojooos(), 3);

	this.instance_1 = new lib.Bocaaas();
	this.instance_1.setTransform(1024.2,737,1,1,0,0,0,112.1,52.2);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.Bocaaas(), 3);

	this.instance_2 = new lib.Corbataa();
	this.instance_2.setTransform(1019.6,972.05,1,1,0,0,0,73.7,130.6);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 2, false, new lib.Corbataa(), 3);

	this.instance_3 = new lib.Manos();
	this.instance_3.setTransform(863,340.95,1,1,0,0,0,248.8,248.8);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 2, false, new lib.Manos(), 3);

	this.movieClip_1 = new lib.Símbolo2();
	this.movieClip_1.name = "movieClip_1";
	this.movieClip_1.setTransform(990.45,583.5,1,1,0,0,0,79.4,0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(17,1,1).p("APmp2QAADYlICZQlICZnQAAQnQAAlJiZQlIiZAAjYQAAjZFIiZQFJiZHQAAQHQAAFICZQFICZAADZgEATbgrtQAABeh7BCQh8BCivAAQivAAh8hCQh8hCAAheQAAhdB8hDQB8hCCvAAQCvAAB8BCQB7BDAABdgAI4a2QAAIdjXF+QjYF/kxAAQkxAAjYl/QjYl+AAodQAAodDYl+QDYl+ExAAQExAADYF+QDXF+AAIdg");
	this.shape.setTransform(1036.45,800.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("EAm4AAAQAAQHrZLYQrZLZwGAAQwGAArYrZQrZrYAAwHQAAwFLZrZQLYrYQGAAQQGAALZLYQLZLZAAQFg");
	this.shape_1.setTransform(862.95,340.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.movieClip_1},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},144).to({state:[{t:this.shape_1},{t:this.shape},{t:this.movieClip_1},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).wait(2));

	// Tipo
	this.movieClip_2 = new lib.Símbolo3();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(919,605.5);
	this.movieClip_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_2).wait(144).to({_off:false},0).wait(3));

	// Capa_11
	this.instance_4 = new lib.Mapadebits16();
	this.instance_4.setTransform(920,711);

	this.instance_5 = new lib.Mapadebits17();
	this.instance_5.setTransform(929,727);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},96).to({state:[]},20).to({state:[{t:this.instance_5}]},19).to({state:[]},9).wait(3));

	// Bocas
	this.instance_6 = new lib.Boca("single",0);
	this.instance_6.setTransform(1023,757,1,1,0,0,0,102,34);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(31).to({_off:false},0).wait(3).to({startPosition:6},0).wait(4).to({startPosition:1},0).wait(3).to({startPosition:8},0).wait(18).to({startPosition:5},0).wait(2).to({startPosition:8},0).wait(4).to({startPosition:5},0).wait(7).to({startPosition:8},0).wait(4).to({startPosition:4},0).wait(3).to({startPosition:8},0).to({_off:true},17).wait(20).to({_off:false,startPosition:3},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:8},0).to({_off:true},14).wait(12));

	// Tipo
	this.instance_7 = new lib.Mapadebits4();
	this.instance_7.setTransform(238,131);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(31).to({_off:false},0).to({_off:true},113).wait(3));

	// Capa_13
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("EgGXBbfQh3gTgsAOQAeriCvrTQA4jcAZhvQAri+AMiRQAFhEAEjXQADixAQhpQARhtAuiWQA4iqAZhVQBdk5AumXQAcj1AanqIAMjmQg5AkgmAaQiXBohrBlQgfAehgBjQhPBRg0AsQh/Big9AyQhsBaguBXQglBHgRBoQgEAfgOCbQgZEihWEYQhWEXiND/QgeA2gZAgQgjArgoAVQhDAihNgcQhOgdgdhFQgghNAmhnQASgwBIiAQBkiwA8jpQAuiyAhkBQAXirALg6QAZh/AshbQA5h4B3h5QA/hACjiKIGrlqQD5jJDOh3IAtgZIAts8IgggJQgugOhagmQhYglgvgOQhNgXh5gQIjIgcQmVhGlckjQlFkQjJmMQizlhhWnDQhGl0gMndQgHjzALi/QANjoAnjGQBUmtDjl/QDjl/FQkYQEcjtERhLQCOgoDCgJQA+gCEXAAIEYABQCgAEB3ARQFWAxErDCQEqDBC6EkQBwCxBNDiQBCDCAsDwQA9FXAOGmQAKEsgOHXQgGDYgKCAQgOC9gcCYQgkC8hKDYQg4CjhhDlQhGCkgzBhQhJCNhTBjQh2CPiuBrQidBijDBAQicA0iNAQQADE4gKGBIgCAqQAoANAgAXQALAHAJAJQBLgIBgAmQDGBOCkDBQCCCaB4DxQAzBmAZBJQATA6AQBJQAKAvAOBWQAwETAUCMQAjDnAPC6QATD0gDE7QgBA/gCAgQgFA0gMApQgOAwgbAlQgdAqgoAVQgtAZg4gEQg3gDgsgfQgqgdgZgyQgZgwAAg1QABgpAQg7IAbhiQAIgmACgwQACgfgBg4QgIn5hwopQgZh5gWhTQgehtgkhZQhEinhsiCQh1iNiUhNQhPgogVgPIgOgKIgPGCQgWIBgbEEQgsGshfFLQgbBfg8C9QgyCngQB6QgMBggCC0QgDC+gJBWQgPCTg9DYIhiFmQgvDFgsF+QguGOgoC3QgLAxgMAdQgSApgeAVQggAXg5AAQgcAAgigGgAA6tUQBWAbBqA2IBWAqQAyAXAoAJQBEAQBSgLQBBgJBTgbQCig1B+hSQCOhcBZh7QArg8AohUQAZgyArhmQBljxArh4QBKjLAhipQAaiCAOijQAIhlAIjCQAgrSglmNQg5ppjmm3QhNiUhShPQgwgvhGgsQgrgbhXgwQiDhHhFgeQhygzhhgUQg/gMhRgEQgygChfAAIltABQiTABhKAFQh6AHhfAZQjJAzjNCZQkRDNi/E+QizEohWFmQhOFDgEF4QgEFFA0F8QA5GdBsErQCGF0DkD1QCnCyDqCDQBpA6BaAeQBtAkBjgBQAggBBBgHQBBgHAhgBIAIAAQBcAABmAgg");
	this.shape_2.setTransform(1664.8841,657.1654);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("EgSNBcWIFY7EQAxj3Aah7QArjMAqiiQCAn4FAtaQg9APhBAZQibA7joCRQnqEykgEDQmIFgi2GJQhOCphcFBQhmFeg7CQQghBShJCjQg6CQgNBvQgEAkgGBJQgGBAgQArQgVA2gsAiQgwAlg0gIQhtgTgfjHQgRhsgDhFQgEhiARhOQANg8AhhMIA9iDQA9iGA8iyQAchVBIjrQB/meBtjTQDImBGSlgQEZj1H6lEQCfhlBbgyQCOhPB7grQCSgzCMgJQAygDAwADIByk5QBhkOBJjlQg/gHhCgPQjpgzlAifQoSkHmfkiQnblLlcl+Ql/mjjnnkQj2oGgooQQgzqcEYqQQEQp9IBnRQHvnAKXj2QJ+jtK4gQQC4gFCNAPQCuASCNAyQCuA9C9CEQBzBRDSCyQEEDdB/B4QDQDECOC0QF+HoCxLNQCNI3AXMNQASJkhXGjQhyIrk5FZQhPBXhvBeQhIA7iIBnQimB/heA8QiVBhiFAyQhxAqkaA5QkAAziEA9QgqAThnA5QhbAzg3AWQgcAMgeAJIgKAuQgSBHgsCDQhEDJhmElQAbAOAdAWQAdAWA0AxQBYBVAwAzQBIBOAvBIQB6C7ApEYQAZCnAFFUIALKHQAFF7gHEMQgTLch/IhQguDGhwAOQg1AHgwgnQgtglgSg4QgOgwACg/QACgkALhMQBapZAMr4QAHnMgZuNQgEh2gHg9QgLhjgchKQgohohkh2IhShZQgOAWgXANQgbAOglABIh5FUQkEL3iFInQhRFRiLL4QiDLKhiF9gEAFrhWCQqbASpZDuQp3D6m8HDQnRHWjEJ8QjJKPCaJrQCiKEIvJ0QGWHIICFXQIBFWJADIQBBAXAqAJQA8AMAxgFQAogEAxgSIBUgjQCbhDDVg8QA6gQFAhRQDng7CPgxQDIhECZhWQDyiKC5jYQC5jZBikEQBZjpAdkuQAVjWgElTQgJruhtoBQiQqnlXnMQiRjDjfjPQiHh+kajoQiHhwhMg1Qh6hVhvgrQh4gviYgRQhXgJhwAAIhRABg");
	this.shape_3.setTransform(1635.7193,651.3231);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("EABlBRYQhIgNgjg4QguhJAch0QAHgfAVg+QAVg9AHggQARhJgCh1QgCihACghQAFhJAXhrQAch3ALg8QANhCAKhTIAQiXIAfkpQAXjlAKiIIgXgDQh+gRiOhFQhZgrihhiIpJllQjFh4hjhAQiihph7hfQiniBi+i5QhwhtjdjnQiiiqhOhYQiBiShaiBQiajdiUlNQjdnzhxn3Qh3oWAIoBQAJodCZn2QCfoLErmnQD5liGPlfQFakuEzihQDahyEXhWQGDh4F0gYQGTgbFoBZQEZBFEtCYQDxB6EpDHQGnEaEdEOQFfFNDGFrQCPEHBqFpQC6J3ATK4QARJKhtH3QhDEwiAFVQhmEOilFgQh2D8haCeQh9DZiHCeQhwCBijCLQhiBTjMCdQkEDIiLBkQjgCji/BzQjQB+inA5QgfAKgeAIQALBlgFBcQgDBKgUCQQgUCRgDBIQgCAiAABhQgBBSgEAwQgHBOgmCkQglCegFBVQgEAuACBYQABBbgCArQgGBUgXBgQgTBLgiBlQgTA2gQAfQgYAsggAZQgpAfgzAAQgQAAgRgDgEgFahK8QmOAsmLC9QlrCslREZQkNDgjOD+QjeEQiMEmQipFmhPHAQiQM9DXNHQDXNGINKSQDED1EADwQDfDREcDcQFNEDEgCqQFcDNFNBrQBbAeBCAMQBYAPBJgIQBfgLBqg3QBEgkByhPQF2kFE+joQC0iEBfhPQCTh6Bkh2QBqh+Bmi0QA+hvBqjcQCOkoBIinQBwkDBCjZQCYn6AFpFQAEoPh2o7Qgzj5g/jDQhKjqhli8Qi7lclQk4QkWkBmUj9QjjiOi/heQjnhxjWg9QkuhXk0AAQh+AAh/APg");
	this.shape_4.setTransform(1500.086,611.7435);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},24).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[]},3).to({state:[]},113).wait(3));

	// Monigote
	this.instance_8 = new lib.Movimiento("synched",0);
	this.instance_8.setTransform(244.6,573.65,1,1,0,0,0,142.7,462.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1).to({regX:108.7,regY:485,x:275.1,y:595.55,startPosition:1},0).wait(1).to({x:339.65,y:595.2,startPosition:2},0).wait(1).to({x:404.2,y:594.85,startPosition:3},0).wait(1).to({x:468.7,y:594.5,startPosition:4},0).wait(1).to({x:533.25,y:594.15,startPosition:5},0).wait(1).to({x:597.8,y:593.75,startPosition:6},0).wait(1).to({x:662.35,y:593.4,startPosition:7},0).wait(1).to({x:726.85,y:593.05,startPosition:8},0).wait(1).to({x:791.4,y:592.7,startPosition:9},0).wait(1).to({x:855.95,y:592.35,startPosition:0},0).wait(1).to({x:920.5,y:592,startPosition:1},0).wait(1).to({x:985,y:591.6,startPosition:2},0).wait(1).to({x:1049.55,y:591.25,startPosition:3},0).wait(1).to({x:1114.1,y:590.9,startPosition:4},0).wait(1).to({x:1178.65,y:590.55,startPosition:5},0).wait(1).to({x:1243.15,y:590.2,startPosition:6},0).wait(1).to({x:1307.7,y:589.85,startPosition:7},0).wait(1).to({x:1372.25,y:589.45,startPosition:8},0).wait(1).to({x:1436.8,y:589.1,startPosition:9},0).wait(1).to({x:1501.3,y:588.75,startPosition:0},0).wait(1).to({x:1565.85,y:588.4,startPosition:1},0).wait(1).to({x:1630.4,y:588.05,startPosition:2},0).wait(1).to({x:1694.95,y:587.7,startPosition:3},0).to({_off:true},1).wait(123));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1061.9,599.6,889.0999999999999,643.6999999999999);
// library properties:
lib.properties = {
	id: '09943635EDD38E4FB2B62A01FE49D832',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Skere_atlas_1.png", id:"Skere_atlas_1"},
		{src:"sounds/SkereeeOriginal.mp3", id:"SkereeeOriginal"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['09943635EDD38E4FB2B62A01FE49D832'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;