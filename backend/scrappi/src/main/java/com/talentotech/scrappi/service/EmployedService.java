// package com.talentotech.scrappi.service;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.talentotech.energia.dto.LoginRequest;
// import com.talentotech.energia.exception.ResourceNotFoundException;
// import com.talentotech.energia.model.User;
// import com.talentotech.energia.repository.UserRepository;

// @service
// public class EmployedService {
  
//     private final EmployedRepository employedRepository;
//     private final PasswordEncoder passwordEncoder;
//     public EmployedService(EmployedRepository employedRepository,
//     PasswordEncoder passwordEncoder
//     ){
//         this.employedRepository = employedRepository;
//         this.passwordEncoder = passwordEncoder;
//     }
//     public Employed crearUsuario(Employed employed){
//         employed.setPassword(passwordEncoder.encode(employed.getPassword()));
//         return employedRepository.save(employed);
//     }
//     public List<Employed> findAll(){
//         return userRepository.findAll();
//     }
//     public Optional<User> findById(Long id){
//         return employedRepository.findById(id);
//     }

//     public Employed update(long id, User userDetails){
//         Employed employed = employedRepository.findById(id)
//         .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
//         if(userDetails.getEmployedName()!=null &&
//         !userDetails.getEmployedName().trim().isEmpty()){
//         employed.setUserName(userDetails.getEmployedName());
//         }
//             if(userDetails.getEmail()!=null &&
//         !userDetails.getEmail().trim().isEmpty()){
//             user.setEmail(userDetails.getEmail());
//         }
//             if(userDetails.getPassword()!=null &&
//         !userDetails.getPassword().trim().isEmpty()){
//             user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
//         }
            
//         if(userDetails.getRole()!=null)
//             user.setRole(userDetails.getRole());
        
//         return userRepository.save(user);
//     }

//     public String login(LoginRequest request){
//         Optional<User> optionalUser = userRepository.findByUserName(request.getUsername());
//         if(optionalUser.isEmpty()){
//             throw new ResourceNotFoundException("usuario no encontrado");
//         }
//         User user = optionalUser.get();
//         if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
//             throw new ResourceNotFoundException("Contraseña incorrecta");
//         }
//         return "Login correcto";
//     }
    
    
    
// }
