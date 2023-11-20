function Validator(formSelector, options){
    // Cách làm ES5 GÁN GIÁ TRỊ DEFAULT CHO PARAMETER KHI ĐỊNH NGHĨA
    if(!options){
        options = {}
    }
    var formElement = document.querySelector(formSelector)
    function getParent(element, selector){
        // Loop while sẽ chạy khi element.parentElement
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }
    var formRules = {}
    var validatorRules = {
        required: function(value){
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng định dạng email'
        },
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`
            }
        }
    }

    // Chỉ xử lý khi có Element trong DOM
    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]')

        for(var input of inputs){
            var rules = input.getAttribute('rules').split('|')
            
            for(var rule of rules){
                var ruleInfo
                var isRuleHasValue = rule.includes(':')

                if(isRuleHasValue){
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }

                var ruleFunc = validatorRules[rule]
                if(isRuleHasValue){
                    ruleFunc = ruleFunc(ruleInfo[1])
                }
                
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc)
                }else{    
                    formRules[input.name] = [ruleFunc]
                }
            }
            // Lắng nghe sự kiện để Validate (Blur, change)
            input.onblur = handleValidate
            input.oninput = handClearError
        }
        //function thực hiện Validate
        function handleValidate(event){
            // console.log(formRules[event.target.name])
            var rules = formRules[event.target.name]
            var errorMessage
            rules.find(function(rule){
                errorMessage = rule(event.target.value)
                return errorMessage
            }) 

            // console.log(errorMessage)
            //Nếu có error thì hiển thị ra Message error       
            if(errorMessage){
                // console.log(event.target)
                var formGroup = getParent(event.target, '.form-group')
                //Nếu có formGoup
                if(formGroup){
                    formGroup.classList.add('invalid')
                    var formMessage = formGroup.querySelector('.form-message')
                    //Nếu có form-message
                    if(formMessage){
                        formMessage.innerText = errorMessage
                    }
                }
            }
            return !errorMessage
        
        }

        function handClearError(event){
            var formGroup = getParent(event.target, '.form-group')
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid')

                var formMessage = formGroup.querySelector('.form-message')
                if(formMessage){
                formMessage.innerText = ''
                }   
            }
        }

    }

    //Đi xử lý hành vi submit của form
    formElement.onsubmit = function(event){
        event.preventDefault()

        var inputs = formElement.querySelectorAll('[name][rules]')
        var isValid = true //default true trong vòng for dưới chạy chỉ cần 1 lần không hợp lệ gán nó lại thành false
        
        for(var input of inputs){
            // console.log(input.name)
            if(!handleValidate({target: input})){// Nếu không hợp lệ
                isValid = false
            }
        }
       
        // console.log(isValid)
        //Khi không có error thì Submit form
        if(isValid){   
            formElement.submit()
            if(typeof options.onSubmit === 'function'){
                options.onSubmit()
            }else{
                formElement.submit()
            }
           
        }
    }
    // console.log(formRules)
  


}
 