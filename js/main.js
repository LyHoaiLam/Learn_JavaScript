function Validator(options){

    function getParent(element, selector){
        while(element.parentElement){/*element đầu là input khi quay lên thì là div, quay nữa ra
        div bên ngoài div cho tới form-group r kết thúc loop*/
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement/*ban đầu element là input sau khi thực hiện gán thì element
            thành tag cha "<div>" tránh bị treo trình duyệt vì cứ loop hoài, khi loop quya lên trên
            thì element đã là div*/
        }
    }
    var selectorRules = {}

    function validate(inputElement, rule){  
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        var errorMessage
        var rules = selectorRules[rule.selector]

        for(var i = 0; i < rules.length; i++){
            // errorMessage = rules[i](inputElement.value)
            switch(inputElement.type){
                case 'radio':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                case 'checkbox':
                    break
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            if(errorMessage) break
        }

        if(errorMessage){
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        }else{
            errorElement.innerText = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }
        return !errorMessage
    }

//Lấy Element của Form
    var formElement = document.querySelector(options.form)
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault()
            
            var isFormValid = true
            options.rules.forEach(function(rule){

                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)  
                if(!isValid){
                    isFormValid = false
                }
            })
        
            if(isFormValid){  
                //Trường hợp Submit vs JavaScript
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                       switch(input.type){
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                                break
                            case 'checkbox':
                                if(!input.matches(':checked')) return values/*Nếu checkboc không đc check thì return values*/
                                if(!Array.isArray(values[input.name])){
                                    values[input.name] = []
                                }

                                values[input.name].push(input.value)                   
                                break /*Không Break nó sẽ lọt xuống default*/        
                            default:
                                values[input.name] = input.value
                       }
                        return values
                    }, {})
                    options.onSubmit(formValues)
                    //Trường hợp Submit vs hành vi default
                }else{
                    formElement.submit()
                }
            }
        }
        // Xử lý lập qua mỗi Rules và xử lý các vấn đề khác (lắng nghe, blur, input,...)
        options.rules.forEach(function(rules){
            if(Array.isArray(selectorRules[rules.selector])){
                selectorRules[rules.selector].push(rules.test)
            }else{
                selectorRules[rules.selector] = [rules.test]
            }
            
            var inputElements = formElement.querySelectorAll(rules.selector)
            Array.from(inputElements).forEach(function(inputElement){
                inputElement.onblur = function(){       
                    validate(inputElement, rules)                          
                }
                inputElement.oninput = function(){
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector('.form-message') 
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })

        })
    }
}

Validator.isRequired = function(selector, message){
    return{
        selector: selector,
        test: function(value){
            return value ? undefined : message || 'Vui lòng nhập thông tin này'
        }
    }
}
Validator.isEmail = function(selector,  message){
    return{
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Vui lòng nhập thông tin này'
        }
    }
}
Validator.minLength = function(selector, min, message){
    return{
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : message || `Nhập vào tối thiểu ${min} ký tự`
        }
    }
}
Validator.isConfirmed = function(selector, getConfirmValue, message){
    return{
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || 'Vui lòng nhập thông tin này'
        }
    }
}
