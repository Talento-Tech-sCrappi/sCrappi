// package com.talentotech.scrappi.controller;
// import java.util.List;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.server.ResponseStatusException;

// import com.talentotech.scrappi.dto.LoginRequest;
// import com.talentotech.scrappi.model.Employed;
// import com.talentotech.scrappi.service.EmployedService;

// @RestController
// @ResquestMapping("api/Employed")
// public class EmployedController {
//     private final EmployedService employedService;
//     public EmployedController(EmployedService employedService){
//         this.employedService = employedService;
//     }
//     @PostMapping
//     public ResponseEntity<Employed> create(@RequestBody Employed employed) { 
//         return  ResponseEntity.status(HttpStatus.CREATED)
//         .body(employedService.crearEmployed(employed));
//     }

//     @GetMapping
//     public List<Employed> findAll(){
//         return employedService.findAll();
//     }
//     //READ BY ID
//     @GetMapping("/{id}")
//     public Employed findByID(@PathVariable Long id){
//         return employedService.findById(id)
//         .orElseThrow(()-> new ResponseStatusException(
//             HttpStatus.NOT_FOUND,
//             "Empleado no encontrado"));
//     }
//     // UPDATE
//     @PutMapping("/{id}")
//     public Employed update(@PathVariable Long id, @RequestBody Employed employedDetails){
        
//         return employedService.update(id, employedDetails);

//     }


//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//         String response = employedService.login(request);
//         return ResponseEntity.ok(response);
//     }
    
// }
