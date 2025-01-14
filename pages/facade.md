---
layout: "section"
---

# Facade

---
layout: "center-diagram"
---

## Problem

Suppose that you're building a home automation system that controls
lighting, security, heating, and entertainment devices. To activate or 
deactivate different parts of the system, the user needs to interact with 
multiple components.

::diagram::

```mermaid
classDiagram
    namespace HomeAutomation {
        class Lights
        class Security
    }

    class Application {
        ...
        +onHomeLeave()
    }

    Application -- Lights
    Application -- Security
```

---
layout: "center-diagram"
---

## A naive solution

Let the user manually control each component separately. The main application
code calls methods on each system to perform a specific action (turning off the lights,
activating the security, etc.)

::diagram::

```mermaid {scale: 0.8}
classDiagram
    namespace ComplexSubsystem {
        class A
        class B
        class C
        class D
        class E
        class F
        class G
    }

    class Client1["Client 1"]
    class Client2["Client 2"]

    C <|-- D
    C <|-- E

    Client1 -- B
    Client1 -- D
    Client2 -- A
    Client2 -- B
    Client2 -- C
    D -- G
    F -- G
```

---

### Problems with the naive solution

<v-clicks>

- **Complexity**: The application code has to handle the individual logic for each subsystem.
- **Tight Coupling**: The application is tightly coupled to specific classes within each subsystem, making it difficult to modify or replace subsystems independently.
- **Reduced Flexibility**: Users must understand the interactions between various subsystems, which can be overwhelming.
- **Maintenance Overhead**: Changes to any subsystem require changes in every place it’s used.


</v-clicks>

---
layout: "center-diagram"
---

## An actual solution

One of the ways to overcome these problems is to use the **facade** pattern. The facade
pattern helps by providing a single, simplified interface for a set of interfaces within
a subsystem. Instead of interacting with multiple components individually, the
client interacts with a Facade class that encapsulates the interactions with 
each component.

::diagram::

```mermaid {scale: 0.92}
classDiagram
    direction LR
    namespace ComplexSubsystem {
        class SubsystemA["Subsystem"]
        class SubsystemB["Subsystem"]
        class SubsystemC["Subsystem"]
    }

    class Client

    class Facade {
        -linksToSubsystemObjects
        -anotherFacade: AnotherFacade
        +subsystemOperation()
    }
    class AnotherFacade {
        ...
        +anotherOperation()
    }

    Client --> Facade

    Facade --> SubsystemA
    Facade --> SubsystemB

    Facade --> AnotherFacade

    AnotherFacade --> SubsystemC
```

---

## Real-life analogy

<img src="/live-example-en-2x.png">

::div{class="text-center"}
*Placing orders by phone.*
::

---
layout: "center-diagram"
---

## Re-implementing a home automation system with facades

::diagram::

```mermaid {scale: 1.5}
classDiagram
    class Client
    class Facade
    class LightController
    class SecuritySystem
    class HeatingSystem

    Client --> Facade
    Facade --> LightController
    Facade --> SecuritySystem
    Facade --> HeatingSystem
```

---

```cpp
class LightsController {
public:
    void turnOn() {
        std::cout << "Lights are ON\n";
    }
    void turnOff() {
        std::cout << "Lights are OFF\n";
    }
}

class SecuritySystem {
public:
    void activate() {
        std::cout << "Security system is ACTIVATED\n";
    }
    void deactivate() {
        std::cout << "Security system is DEACTIVATED\n";
    }
}

class HeatingSystem {
public:
    void setTemperature(int temperature) {
        std::cout << "Heating system set to " << temperature << " degrees\n";
    }
}
```

---

```cpp
class HomeAutomationFacade {
    LightsController lights_;
    SecuritySystem security_;
    HeatingSystem heating_;
public:
    void onLeaveHome() {
        lights_.turnOff();
        security_.activate();        
    }
    void onEnterHome() {
        lights_.turnOn();
        security_.deactivate();
        heating_.setTemperature(22);
    }
}

int main() {
    HomeAutomationFacade facade;
    std::cout << "Leaving home...\n";
    facade.onLeaveHome();
    std::cout << "-------------------------\n";
    std::cout << "Entering home...\n";
    facade.onEnterHome();
    return 0;
}
```

---
layout: "BetterTwoColsHeader"
---

## Pros and cons

::left::
✔ Simplifies complex systems by providing a single interface.

✔ Reduces coupling between clients and subsystems.

✔ Improves readability and usability of code for the client.

::right::
❌ Adds an additional layer that could lead to more code.

❌ Limited flexibility if the client requires direct access to the subsystems for more specific functionalities.

---
layout: "center-diagram"
---

## Real world applications

In web development, an API gateway is a facade that abstracts away microservices
such as authentication, object storage, data management.

::diagram::

```mermaid {scale: 1}
classDiagram
    direction LR

    class MobileApp["Mobile App"]
    class WebApp["Web App"]
    class ApiGateway["API Gateway"]

    MobileApp --> ApiGateway
    WebApp --> ApiGateway

    namespace Microservices {
        class Authentication
        class AttachmentStorage
        class Database
    }

    ApiGateway --> Authentication
    ApiGateway --> AttachmentStorage
    ApiGateway --> Database
```

---
layout: "center-diagram"
---

In systems programming, the details of the hardware are usually abstracted
away from the kernel and the operating system. On Windows, this facade is called
the HAL (Hardware Abstraction Layer).

::diagram::

<img width="325" src="/Windows_2000_architecture.svg">
