angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('WizardCtrl', function($scope, $ionicSlideBoxDelegate,$timeout) {

  var sbox = $ionicSlideBoxDelegate.$getByHandle('wizard');

  //Overall stuff
  $scope.slide = -1;
  $scope.colors = [
    'red','orange','yellow','green','blue','purple'
  ];
  $scope.quests = [
    '',
    'Tacos',
    'Holy Grail',
    'Pizza'
  ];
  //Control functions
  $scope.next = function(){
    $ionicSlideBoxDelegate.next();
  }
  $scope.back = function(){
    $ionicSlideBoxDelegate.previous();
  }
  $timeout(function(){
    $scope.$watch(function(){
        return $ionicSlideBoxDelegate.currentIndex();
    }, function(index){

      $scope.errorMessage = "";

      //Initial state, don't validate
      if($scope.slide < 0){
        $scope.slide = 0;
        return;
      }

      if($scope.slides[$scope.slide].isValid()){
        $scope.slide = index;
        return;
      } else {
        $ionicSlideBoxDelegate.slide($scope.slide);
        $scope.errorMessage = $scope.slides[$scope.slide].errorMessage;
      }

    });
  },0);


  $scope.slides = [];
  //Setup the slides
  $scope.slide1 = new Slide();
  $scope.slide1.validators.push(function(){
    return $scope.slide1.firstName && $scope.slide1.firstName.length != 0;
  });
  $scope.slide1.validators.push(function(){
    return $scope.slide1.lastName && $scope.slide1.lastName.length != 0;
  });
  $scope.slide1.errorMessage = "Please enter your name!";
  $scope.slides.push($scope.slide1);

  $scope.slide2 = new Slide();
  $scope.slide2.validators.push(function(){
    return $scope.slide2.quest && $scope.slide2.quest.length != 0;
  });
  $scope.slide2.errorMessage = "Choose a quest!";
  $scope.slides.push($scope.slide2);

  $scope.slide3 = new Slide();
  $scope.slide3.validators.push(function(){
    return $scope.slide3.color && $scope.slide3.color.length != 0;
  });
  $scope.slide3.errorMessage = "Please choose a color";
  $scope.slides.push($scope.slide3);

  $scope.slide4 = new Slide();
  $scope.slide4.validators.push(function(){
    return $scope.slide4.african || $scope.slide4.european;
  });
  $scope.slide4.errorMessage = "Choose an air speed!";
  $scope.slides.push($scope.slide4);

  $scope.slide5 = new Slide();
  $scope.slide5.validators.push(function(){
    return $scope.slide5.love > 50;
  });
  $scope.slide5.errorMessage = "You don't love kittens enough!";
  $scope.slides.push($scope.slide5);
});

var Slide = function(){
  this.validators = [];
  this.errorMessage = "Something went wrong!";
}
Slide.prototype.isValid = function(){
  if(this.validators.length == 0){
    return true;
  }
  for (var i=0; i < this.validators.length; i++){
    if(!this.validators[i]()){
      return false;
    }
  }
  return true;
}
